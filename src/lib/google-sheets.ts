/**
 * Google Sheets API v4 helper functions
 *
 * Setup Instructions:
 * 1. Create a Google Cloud Project and enable Google Sheets API
 * 2. Create a Service Account and download the JSON key file
 * 3. Share your Google Sheet with the service account email (found in the JSON)
 * 4. Set environment variables:
 *    - GOOGLE_SHEETS_ID: The spreadsheet ID from the sheet URL
 *    - GOOGLE_SHEETS_RANGE: The range to read/write (default: "Sheet1!A:A")
 *    - GOOGLE_SERVICE_ACCOUNT_EMAIL: Service account email
 *    - GOOGLE_PRIVATE_KEY: Private key from the service account JSON (with \n replaced with actual newlines)
 *
 * Note: API keys can only be used for READ operations on public sheets.
 * For WRITE operations, you MUST use service account authentication.
 *
 * Alternative (for public sheets with API key - READ ONLY):
 *    - GOOGLE_SHEETS_ID: The spreadsheet ID
 *    - GOOGLE_SHEETS_API_KEY: Your Google API key
 *    - GOOGLE_SHEETS_RANGE: The range (default: "Sheet1!A:A")
 */

interface GoogleSheetsConfig {
  spreadsheetId: string;
  range: string;
  // Service account auth
  serviceAccountEmail?: string;
  privateKey?: string;
  // API key auth (for public sheets)
  apiKey?: string;
}

const getConfig = (): GoogleSheetsConfig => {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  const range = process.env.GOOGLE_SHEETS_RANGE || "Sheet1!A:A";

  if (!spreadsheetId) {
    throw new Error("Missing GOOGLE_SHEETS_ID environment variable");
  }

  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

  // Service account is required for write operations, but API key can be used for read-only
  // We'll validate this when needed in makeRequest

  return {
    spreadsheetId,
    range,
    serviceAccountEmail,
    privateKey,
    apiKey,
  };
};

/**
 * Get OAuth2 access token using service account
 */
async function getAccessToken(): Promise<string> {
  const config = getConfig();

  if (!config.serviceAccountEmail || !config.privateKey) {
    throw new Error("Service account credentials not configured");
  }

  // Dynamic import to handle optional dependency
  // jsonwebtoken is an optional dependency - install with: npm install jsonwebtoken @types/jsonwebtoken
  let jwt: {
    sign: (payload: unknown, key: string, options: unknown) => string;
  };
  try {
    const jwtModule = await import("jsonwebtoken");
    jwt = (jwtModule.default || jwtModule) as typeof jwt;
  } catch {
    throw new Error(
      "jsonwebtoken package required for service account auth. Install with: npm install jsonwebtoken @types/jsonwebtoken"
    );
  }

  const now = Math.floor(Date.now() / 1000);

  // Format the private key - handle both escaped and actual newlines
  let formattedKey = config.privateKey;
  // Replace escaped newlines with actual newlines
  formattedKey = formattedKey.replace(/\\n/g, "\n");
  // Ensure the key starts and ends correctly
  if (!formattedKey.includes("BEGIN PRIVATE KEY")) {
    throw new Error(
      "Invalid private key format. Must include BEGIN/END PRIVATE KEY markers."
    );
  }

  // Create JWT token with proper claims
  const token = jwt.sign(
    {
      iss: config.serviceAccountEmail,
      sub: config.serviceAccountEmail,
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
      scope: "https://www.googleapis.com/auth/spreadsheets",
    },
    formattedKey,
    { algorithm: "RS256" }
  );

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: token,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `Failed to get access token: ${response.statusText}`;

    try {
      const errorData = JSON.parse(errorText);
      if (errorData.error_description) {
        errorMessage += ` - ${errorData.error_description}`;
      } else if (errorData.error) {
        errorMessage += ` - ${errorData.error}`;
      }
      // Log full error for debugging
      console.error("OAuth2 token error details:", errorData);
    } catch {
      // If error response isn't JSON, include the raw text
      errorMessage += ` - ${errorText}`;
    }

    throw new Error(errorMessage);
  }

  const data = await response.json();
  if (!data.access_token) {
    throw new Error("No access token in response from Google OAuth2");
  }

  return data.access_token;
}

/**
 * Make an authenticated request to Google Sheets API
 */
async function makeRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const config = getConfig();
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}${endpoint}`;

  // Check if this is a write operation (POST, PUT, PATCH, DELETE)
  const method = options.method?.toUpperCase() || "GET";
  const isWriteOperation = ["POST", "PUT", "PATCH", "DELETE"].includes(method);

  // Write operations require OAuth2 (service account), not API keys
  if (isWriteOperation) {
    if (!config.serviceAccountEmail || !config.privateKey) {
      const errorMsg =
        "Write operations require service account authentication. " +
        "Please set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY environment variables. " +
        "API keys cannot be used for write operations. " +
        `Current config: serviceAccountEmail=${!!config.serviceAccountEmail}, privateKey=${!!config.privateKey}, apiKey=${!!config.apiKey}`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    // Use OAuth2 token authentication (for service account)
    const token = await getAccessToken();
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Read operations can use either API key or OAuth2
  if (config.apiKey) {
    // Use API key authentication (for public sheets - read only)
    const urlWithKey = `${url}${endpoint.includes("?") ? "&" : "?"}key=${
      config.apiKey
    }`;
    return fetch(urlWithKey, options);
  } else {
    // Use OAuth2 token authentication (for service account)
    if (!config.serviceAccountEmail || !config.privateKey) {
      throw new Error(
        "No authentication method configured. Please set either service account credentials or API key."
      );
    }
    const token = await getAccessToken();
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

/**
 * Read all selected numbers from Google Sheets
 */
export async function getSelectedNumbers(): Promise<number[]> {
  try {
    const config = getConfig();
    const response = await makeRequest(`/values/${config.range}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to read from Google Sheets: ${response.statusText} - ${errorText}`
      );
    }

    const data = await response.json();
    const values = data.values || [];

    // Flatten and convert to numbers, filtering out empty values
    const numbers = values
      .flat()
      .map((val: string) => parseInt(val, 10))
      .filter((num: number) => !isNaN(num) && num >= 1 && num <= 100);

    return numbers;
  } catch (error) {
    console.error("Error reading from Google Sheets:", error);
    throw error;
  }
}

/**
 * Check if a number is already selected
 */
export async function isNumberSelected(number: number): Promise<boolean> {
  const selectedNumbers = await getSelectedNumbers();
  return selectedNumbers.includes(number);
}

/**
 * Add a number to Google Sheets
 * Note: This function assumes the number has already been checked for availability.
 * Use isNumberSelected() first to avoid unnecessary writes.
 */
export async function selectNumber(
  number: number,
  skipCheck = false
): Promise<boolean> {
  try {
    const config = getConfig();

    // Verify service account credentials are set before attempting write
    if (!config.serviceAccountEmail || !config.privateKey) {
      throw new Error(
        "Cannot write to Google Sheets: Service account credentials are required. " +
          "Please set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY environment variables. " +
          "API keys cannot be used for write operations."
      );
    }

    // Only check if skipCheck is false (for backward compatibility)
    if (!skipCheck) {
      const isSelected = await isNumberSelected(number);
      if (isSelected) {
        return false;
      }
    }

    // Append the number to the sheet
    const response = await makeRequest(
      `/values/${config.range}:append?valueInputOption=RAW`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [[number.toString()]],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to write to Google Sheets: ${response.statusText} - ${errorText}`
      );
    }

    return true;
  } catch (error) {
    console.error("Error writing to Google Sheets:", error);
    throw error;
  }
}

/**
 * Get all selected numbers with their selection status
 */
export async function getAllNumbersStatus(): Promise<Record<number, boolean>> {
  const selectedNumbers = await getSelectedNumbers();
  const status: Record<number, boolean> = {};

  // Initialize all numbers 1-100 as false
  for (let i = 1; i <= 100; i++) {
    status[i] = false;
  }

  // Mark selected numbers as true
  selectedNumbers.forEach((num) => {
    status[num] = true;
  });

  return status;
}
