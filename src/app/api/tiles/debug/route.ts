// Helper to check configuration for debugging (remove in production)
function getConfigForDebug() {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    const range = process.env.GOOGLE_SHEETS_RANGE || "Sheet1!A:A";
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

    return {
      hasSpreadsheetId: !!spreadsheetId,
      spreadsheetId: spreadsheetId
        ? `${spreadsheetId.substring(0, 10)}...`
        : null,
      range,
      hasServiceAccountEmail: !!serviceAccountEmail,
      serviceAccountEmail: serviceAccountEmail
        ? `${serviceAccountEmail.substring(0, 20)}...`
        : null,
      hasPrivateKey: !!privateKey,
      privateKeyLength: privateKey?.length || 0,
      hasApiKey: !!apiKey,
      apiKey: apiKey ? `${apiKey.substring(0, 10)}...` : null,
      canWrite: !!(serviceAccountEmail && privateKey),
    };
  } catch (error) {
    return { error: String(error) };
  }
}

export async function GET() {
  const config = getConfigForDebug();
  return Response.json(config, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
