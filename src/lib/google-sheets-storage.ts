// Google Sheets storage - Simple and visual way to store messages
// Install: npm install googleapis

/*
import { google } from 'googleapis';

// Setup instructions:
// 1. Go to Google Cloud Console
// 2. Create a new project or select existing
// 3. Enable Google Sheets API
// 4. Create service account credentials
// 5. Download JSON key file
// 6. Share your Google Sheet with the service account email

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE, // Path to your JSON key file
  scopes: ['https://www.googleapis.com/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Your Google Sheets IDs (create these sheets first)
const CONTACT_SHEET_ID = process.env.GOOGLE_CONTACT_SHEET_ID;
const SUBSCRIPTION_SHEET_ID = process.env.GOOGLE_SUBSCRIPTION_SHEET_ID;

export async function saveContactToGoogleSheets(data: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const values = [
      [
        new Date().toISOString(), // Timestamp
        data.name,
        data.email,
        data.message,
        'FALSE', // Read status
        'New', // Status
      ],
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: CONTACT_SHEET_ID,
      range: 'Contact Forms!A:F', // Adjust range as needed
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    console.log('✅ Contact saved to Google Sheets:', response.data.updates?.updatedRows);
    return { success: true, id: `row_${response.data.updates?.updatedRows}` };
  } catch (error) {
    console.error('❌ Google Sheets contact save failed:', error);
    return { success: false, error: error.message };
  }
}

export async function saveSubscriptionToGoogleSheets(email: string) {
  try {
    const values = [
      [
        new Date().toISOString(), // Timestamp
        email,
        'Portfolio Newsletter', // Source
        'Active', // Status
      ],
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SUBSCRIPTION_SHEET_ID,
      range: 'Email Subscriptions!A:D', // Adjust range as needed
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    console.log('✅ Subscription saved to Google Sheets:', response.data.updates?.updatedRows);
    return { success: true, id: `row_${response.data.updates?.updatedRows}` };
  } catch (error) {
    console.error('❌ Google Sheets subscription save failed:', error);
    return { success: false, error: error.message };
  }
}

// Read contacts from Google Sheets
export async function getContactsFromGoogleSheets() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: CONTACT_SHEET_ID,
      range: 'Contact Forms!A:F',
    });

    const rows = response.data.values || [];
    const contacts = rows.slice(1).map((row, index) => ({ // Skip header row
      id: `row_${index + 2}`,
      timestamp: row[0],
      name: row[1],
      email: row[2],
      message: row[3],
      read: row[4] === 'TRUE',
      status: row[5],
    }));

    return contacts;
  } catch (error) {
    console.error('❌ Failed to fetch contacts from Google Sheets:', error);
    return [];
  }
}

// Read subscriptions from Google Sheets
export async function getSubscriptionsFromGoogleSheets() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SUBSCRIPTION_SHEET_ID,
      range: 'Email Subscriptions!A:D',
    });

    const rows = response.data.values || [];
    const subscriptions = rows.slice(1).map((row, index) => ({ // Skip header row
      id: `row_${index + 2}`,
      timestamp: row[0],
      email: row[1],
      source: row[2],
      status: row[3],
    }));

    return subscriptions;
  } catch (error) {
    console.error('❌ Failed to fetch subscriptions from Google Sheets:', error);
    return [];
  }
}
*/

// =============================================================================
// SIMPLE GOOGLE SHEETS SETUP (Alternative using fetch)
// =============================================================================

// You can also use Google Apps Script to create a simple webhook
// 1. Create a Google Sheet
// 2. Go to Extensions > Apps Script
// 3. Create a script that receives POST requests
// 4. Deploy as web app
// 5. Use the webhook URL below

export async function saveContactToGoogleSheetsWebhook(data: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.log('📝 CONTACT - Would save to Google Sheets:', data);
      return { success: true, id: 'webhook_not_configured' };
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'contact',
        timestamp: new Date().toISOString(),
        ...data,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Contact saved to Google Sheets via webhook:', result);
    return { success: true, id: result.id || 'webhook_success' };
  } catch (error) {
    console.error('❌ Google Sheets webhook failed:', error);
    return { success: false, error: error.message };
  }
}

export async function saveSubscriptionToGoogleSheetsWebhook(email: string) {
  try {
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.log('📧 SUBSCRIPTION - Would save to Google Sheets:', { email });
      return { success: true, id: 'webhook_not_configured' };
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'subscription',
        timestamp: new Date().toISOString(),
        email,
        source: 'Portfolio Newsletter',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Subscription saved to Google Sheets via webhook:', result);
    return { success: true, id: result.id || 'webhook_success' };
  } catch (error) {
    console.error('❌ Google Sheets webhook failed:', error);
    return { success: false, error: error.message };
  }
}

// Google Apps Script code for the webhook (paste this in Google Apps Script):
/*
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    
    if (data.type === 'contact') {
      const contactSheet = sheet.getSheetByName('Contact Forms') || sheet.insertSheet('Contact Forms');
      
      // Add headers if first row is empty
      if (contactSheet.getLastRow() === 0) {
        contactSheet.getRange(1, 1, 1, 6).setValues([['Timestamp', 'Name', 'Email', 'Message', 'Read', 'Status']]);
      }
      
      contactSheet.appendRow([
        data.timestamp,
        data.name,
        data.email,
        data.message,
        false,
        'New'
      ]);
      
    } else if (data.type === 'subscription') {
      const subscriptionSheet = sheet.getSheetByName('Email Subscriptions') || sheet.insertSheet('Email Subscriptions');
      
      // Add headers if first row is empty
      if (subscriptionSheet.getLastRow() === 0) {
        subscriptionSheet.getRange(1, 1, 1, 4).setValues([['Timestamp', 'Email', 'Source', 'Status']]);
      }
      
      subscriptionSheet.appendRow([
        data.timestamp,
        data.email,
        data.source,
        'Active'
      ]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      id: Utilities.getUuid()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
*/
