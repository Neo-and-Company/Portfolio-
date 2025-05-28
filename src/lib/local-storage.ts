// Local file storage for development/testing
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');
const SUBSCRIPTIONS_FILE = path.join(DATA_DIR, 'subscriptions.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Contact form storage
export async function saveContactSubmission(data: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    await ensureDataDir();
    
    const submission = {
      id: Date.now().toString(),
      ...data,
      timestamp: new Date().toISOString(),
      read: false,
    };

    // Read existing contacts
    let contacts = [];
    try {
      const existingData = await fs.readFile(CONTACTS_FILE, 'utf-8');
      contacts = JSON.parse(existingData);
    } catch {
      // File doesn't exist yet, start with empty array
    }

    // Add new submission
    contacts.unshift(submission); // Add to beginning

    // Save back to file
    await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
    
    console.log('✅ Contact saved to:', CONTACTS_FILE);
    return { success: true, id: submission.id };
  } catch (error) {
    console.error('❌ Failed to save contact:', error);
    return { success: false, error: error.message };
  }
}

// Email subscription storage
export async function saveEmailSubscription(email: string) {
  try {
    await ensureDataDir();
    
    const subscription = {
      id: Date.now().toString(),
      email,
      timestamp: new Date().toISOString(),
      source: 'Portfolio Newsletter',
    };

    // Read existing subscriptions
    let subscriptions = [];
    try {
      const existingData = await fs.readFile(SUBSCRIPTIONS_FILE, 'utf-8');
      subscriptions = JSON.parse(existingData);
    } catch {
      // File doesn't exist yet, start with empty array
    }

    // Check if email already exists
    const existingSubscription = subscriptions.find(sub => sub.email === email);
    if (existingSubscription) {
      return { success: false, error: 'Email already subscribed' };
    }

    // Add new subscription
    subscriptions.unshift(subscription); // Add to beginning

    // Save back to file
    await fs.writeFile(SUBSCRIPTIONS_FILE, JSON.stringify(subscriptions, null, 2));
    
    console.log('✅ Subscription saved to:', SUBSCRIPTIONS_FILE);
    return { success: true, id: subscription.id };
  } catch (error) {
    console.error('❌ Failed to save subscription:', error);
    return { success: false, error: error.message };
  }
}

// Read contacts (for dashboard)
export async function getContactSubmissions() {
  try {
    const data = await fs.readFile(CONTACTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return []; // Return empty array if file doesn't exist
  }
}

// Read subscriptions (for dashboard)
export async function getEmailSubscriptions() {
  try {
    const data = await fs.readFile(SUBSCRIPTIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return []; // Return empty array if file doesn't exist
  }
}

// Mark contact as read
export async function markContactAsRead(id: string) {
  try {
    const contacts = await getContactSubmissions();
    const updatedContacts = contacts.map(contact => 
      contact.id === id ? { ...contact, read: true } : contact
    );
    
    await fs.writeFile(CONTACTS_FILE, JSON.stringify(updatedContacts, null, 2));
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to mark as read:', error);
    return { success: false, error: error.message };
  }
}
