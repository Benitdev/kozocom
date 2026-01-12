# Tile Selection Setup Guide

This guide explains how to set up the Google Sheets integration for the tile selection feature.

## Option 1: Service Account (Recommended for Production)

This method uses a service account for secure authentication.

### Steps:

1. **Create a Google Cloud Project**

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Google Sheets API**

   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

3. **Create a Service Account**

   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Fill in the details and create the account
   - Click on the created service account
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key" > Choose JSON format
   - Download the JSON file

4. **Share Your Google Sheet**

   - Open your Google Sheet
   - Click "Share" button
   - Add the service account email (found in the JSON file as `client_email`)
   - Give it "Editor" permissions

5. **Set Environment Variables**
   Add these to your `.env.local` file:

   ```env
   GOOGLE_SHEETS_ID=your_spreadsheet_id_here
   GOOGLE_SHEETS_RANGE=Sheet1!A:A
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   ```

   **Important**:

   - The `GOOGLE_PRIVATE_KEY` should include the full private key from the JSON file
   - Replace actual newlines with `\n` in the environment variable
   - Keep the quotes around the private key value

6. **Install Required Package**
   ```bash
   npm install jsonwebtoken @types/jsonwebtoken
   ```

## Option 2: API Key (READ ONLY - Not Recommended)

⚠️ **IMPORTANT**: API keys can ONLY be used for reading data from public Google Sheets.
**Write operations (selecting tiles) REQUIRE service account authentication.**

If you need write functionality (which this tile selection feature requires), you MUST use Option 1 (Service Account).

### Steps (Read-Only Setup):

1. **Create API Key**

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key

2. **Make Your Sheet Public**

   - Open your Google Sheet
   - Click "Share" > "Change to anyone with the link"
   - Set permission to "Viewer" (read-only)

3. **Set Environment Variables**

   ```env
   GOOGLE_SHEETS_ID=your_spreadsheet_id_here
   GOOGLE_SHEETS_RANGE=Sheet1!A:A
   GOOGLE_SHEETS_API_KEY=your_api_key_here
   ```

   **Note**: This setup will only allow reading tile status. Tile selection (write operations) will fail with authentication errors. You must use service account authentication for full functionality.

## Getting Your Spreadsheet ID

The spreadsheet ID is found in your Google Sheet URL:

```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
```

## Testing

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Navigate to `/tile-selection`

3. Click on a tile to test the selection functionality

## Troubleshooting

- **"Missing Google Sheets configuration"**: Check that all required environment variables are set
- **"Failed to read from Google Sheets"**: Verify the spreadsheet ID and that the sheet is shared with the service account (for service account auth) or is public (for API key auth)
- **"Failed to write to Google Sheets" / "API keys are not supported by this API"**:
  - ⚠️ **This error means you're trying to use an API key for write operations**
  - You MUST use service account authentication (Option 1) for write operations
  - API keys cannot be used to write to Google Sheets
  - Set `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY` environment variables
  - Install `jsonwebtoken` package: `npm install jsonwebtoken @types/jsonwebtoken`
- **"Unauthorized" or "UNAUTHENTICATED" errors**:
  - Verify your service account credentials are correct
  - Ensure the service account email has Editor permissions on the Google Sheet
  - Check that the private key is correctly formatted with `\n` for newlines
- **"Failed to get access token: Bad Request"**:
  - **Most common cause**: Incorrect private key format
  - The private key must include the full key with `BEGIN PRIVATE KEY` and `END PRIVATE KEY` markers
  - In your `.env.local`, the private key should be in quotes with `\n` for newlines:
    ```env
    GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
    ```
  - Make sure you copied the ENTIRE private key from the JSON file (it's usually a very long string)
  - Verify the service account email matches exactly (including the domain)
  - Check that Google Sheets API is enabled in your Google Cloud project
- **"jsonwebtoken package required"**: Install with `npm install jsonwebtoken @types/jsonwebtoken`
