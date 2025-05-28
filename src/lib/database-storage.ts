// Database storage options for production

// =============================================================================
// OPTION A: SUPABASE (Recommended - Free tier available)
// =============================================================================
// Install: npm install @supabase/supabase-js
// Sign up: https://supabase.com

/*
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Create tables in Supabase SQL editor:
// 
// CREATE TABLE contact_submissions (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   name TEXT NOT NULL,
//   email TEXT NOT NULL,
//   message TEXT NOT NULL,
//   read BOOLEAN DEFAULT FALSE,
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
// );
//
// CREATE TABLE email_subscriptions (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   email TEXT UNIQUE NOT NULL,
//   source TEXT DEFAULT 'Portfolio Newsletter',
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
// );

export async function saveContactToSupabase(data: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const { data: result, error } = await supabase
      .from('contact_submissions')
      .insert([{
        name: data.name,
        email: data.email,
        message: data.message,
      }])
      .select();

    if (error) throw error;

    console.log('✅ Contact saved to Supabase:', result[0].id);
    return { success: true, id: result[0].id };
  } catch (error) {
    console.error('❌ Supabase contact save failed:', error);
    return { success: false, error: error.message };
  }
}

export async function saveSubscriptionToSupabase(email: string) {
  try {
    const { data: result, error } = await supabase
      .from('email_subscriptions')
      .insert([{ email }])
      .select();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return { success: false, error: 'Email already subscribed' };
      }
      throw error;
    }

    console.log('✅ Subscription saved to Supabase:', result[0].id);
    return { success: true, id: result[0].id };
  } catch (error) {
    console.error('❌ Supabase subscription save failed:', error);
    return { success: false, error: error.message };
  }
}

export async function getContactsFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('❌ Failed to fetch contacts from Supabase:', error);
    return [];
  }
}

export async function getSubscriptionsFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('email_subscriptions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('❌ Failed to fetch subscriptions from Supabase:', error);
    return [];
  }
}
*/

// =============================================================================
// OPTION B: FIREBASE FIRESTORE
// =============================================================================
// Install: npm install firebase
// Sign up: https://firebase.google.com

/*
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase config
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function saveContactToFirebase(data: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const docRef = await addDoc(collection(db, 'contact_submissions'), {
      ...data,
      read: false,
      timestamp: new Date(),
    });

    console.log('✅ Contact saved to Firebase:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('❌ Firebase contact save failed:', error);
    return { success: false, error: error.message };
  }
}

export async function saveSubscriptionToFirebase(email: string) {
  try {
    const docRef = await addDoc(collection(db, 'email_subscriptions'), {
      email,
      source: 'Portfolio Newsletter',
      timestamp: new Date(),
    });

    console.log('✅ Subscription saved to Firebase:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('❌ Firebase subscription save failed:', error);
    return { success: false, error: error.message };
  }
}
*/

// =============================================================================
// OPTION C: MONGODB
// =============================================================================
// Install: npm install mongodb
// Sign up: https://www.mongodb.com/atlas (free tier available)

/*
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);

export async function saveContactToMongoDB(data: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    await client.connect();
    const db = client.db('portfolio');
    const collection = db.collection('contact_submissions');

    const result = await collection.insertOne({
      ...data,
      read: false,
      timestamp: new Date(),
    });

    console.log('✅ Contact saved to MongoDB:', result.insertedId);
    return { success: true, id: result.insertedId.toString() };
  } catch (error) {
    console.error('❌ MongoDB contact save failed:', error);
    return { success: false, error: error.message };
  } finally {
    await client.close();
  }
}

export async function saveSubscriptionToMongoDB(email: string) {
  try {
    await client.connect();
    const db = client.db('portfolio');
    const collection = db.collection('email_subscriptions');

    // Check if email already exists
    const existing = await collection.findOne({ email });
    if (existing) {
      return { success: false, error: 'Email already subscribed' };
    }

    const result = await collection.insertOne({
      email,
      source: 'Portfolio Newsletter',
      timestamp: new Date(),
    });

    console.log('✅ Subscription saved to MongoDB:', result.insertedId);
    return { success: true, id: result.insertedId.toString() };
  } catch (error) {
    console.error('❌ MongoDB subscription save failed:', error);
    return { success: false, error: error.message };
  } finally {
    await client.close();
  }
}
*/

// =============================================================================
// OPTION D: AIRTABLE (Spreadsheet-like database)
// =============================================================================
// Install: npm install airtable
// Sign up: https://airtable.com

/*
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!);

export async function saveContactToAirtable(data: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const records = await base('Contact Submissions').create([
      {
        fields: {
          Name: data.name,
          Email: data.email,
          Message: data.message,
          Read: false,
          Timestamp: new Date().toISOString(),
        },
      },
    ]);

    console.log('✅ Contact saved to Airtable:', records[0].id);
    return { success: true, id: records[0].id };
  } catch (error) {
    console.error('❌ Airtable contact save failed:', error);
    return { success: false, error: error.message };
  }
}
*/

// =============================================================================
// TEMPORARY FALLBACK (Current implementation)
// =============================================================================

export async function saveContactSubmission(data: {
  name: string;
  email: string;
  message: string;
}) {
  // This is a placeholder - replace with your chosen database option above
  console.log('📝 CONTACT SUBMISSION - Would save to database:', {
    ...data,
    timestamp: new Date().toISOString(),
    read: false,
  });
  
  return { success: true, id: Date.now().toString() };
}

export async function saveEmailSubscription(email: string) {
  // This is a placeholder - replace with your chosen database option above
  console.log('📧 EMAIL SUBSCRIPTION - Would save to database:', {
    email,
    timestamp: new Date().toISOString(),
    source: 'Portfolio Newsletter',
  });
  
  return { success: true, id: Date.now().toString() };
}
