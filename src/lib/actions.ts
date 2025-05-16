
"use server";

import { z } from "zod";
// import nodemailer from 'nodemailer';

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export type ContactFormState = {
  message: string;
  success: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  fieldValues?: {
    name: string;
    email: string;
    message: string;
  }
};

// This is the email address where you will receive contact form submissions
const RECIPIENT_EMAIL = "gabrielmancillas1034@icloud.com"; 

// These should be set in your .env file
const SENDER_EMAIL = process.env.GMAIL_EMAIL; 
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  const validatedFields = contactSchema.safeParse({
    name,
    email,
    message,
  });

  if (!validatedFields.success) {
    return {
      message: "Form submission failed. Please check the errors below.",
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      fieldValues: { name, email, message }
    };
  }

  // Temporarily bypass email sending if credentials are not set or nodemailer is not installed
  if (!SENDER_EMAIL || !GMAIL_APP_PASSWORD) {
    console.warn("Gmail credentials (GMAIL_EMAIL or GMAIL_APP_PASSWORD) are not set in environment variables. Email cannot be sent.");
    // Simulate success for the UI if credentials are not set.
    return {
      message: "Thank you for your message! (Admin: Email service not fully configured).",
      success: true, 
      fieldValues: { name: "", email: "", message: "" }
    };
  }

  /*
  // ** EMAIL SENDING LOGIC - UNCOMMENT AFTER INSTALLING NODEMAILER AND SETTING UP GMAIL **
  // Verify nodemailer is installed before uncommenting the lines below.
  // You can check by looking for 'nodemailer' in your package.json dependencies.
  // If it's not there, run: npm install nodemailer

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SENDER_EMAIL,
      pass: GMAIL_APP_PASSWORD, // Use the App Password here
    },
  });

  const mailOptions = {
    from: `"${validatedFields.data.name}" <${SENDER_EMAIL}>`,
    to: RECIPIENT_EMAIL,
    replyTo: validatedFields.data.email,
    subject: `New Contact Form Submission from ${validatedFields.data.name}`,
    text: `You have received a new message from your website contact form:\n\n
           Name: ${validatedFields.data.name}\n
           Email: ${validatedFields.data.email}\n
           Message:\n${validatedFields.data.message}`,
    html: `<p>You have received a new message from your website contact form:</p>
           <p><strong>Name:</strong> ${validatedFields.data.name}</p>
           <p><strong>Email:</strong> ${validatedFields.data.email}</p>
           <p><strong>Message:</strong></p>
           <p>${validatedFields.data.message.replace(/\n/g, '<br>')}</p>`,
  };
  */

  try {
    // await transporter.sendMail(mailOptions); // UNCOMMENT THIS LINE TOO
    console.log("Contact form submitted (email sending is currently commented out). Recipient:", RECIPIENT_EMAIL);
    console.log("Form data:", validatedFields.data);
    return {
      message: "Thank you for your message! It has been received (email sending is temporarily disabled).",
      success: true,
      fieldValues: { name: "", email: "", message: "" } 
    };
  } catch (error) {
    console.error("Error preparing to send contact form email (email sending is currently commented out):", error);
    let errorMessage = "An unexpected error occurred while processing your message. Please try again later.";
    
    // if (error instanceof Error) {
    //   const nodeError = error as NodeJS.ErrnoException;
    //   if (nodeError.code === 'EAUTH' || (error.message && error.message.includes("Authentication failed"))) {
    //     errorMessage = "Email server authentication failed. Please check server configuration. (Hint: Gmail App Password or 2FA settings).";
    //   } else if (nodeError.code === 'EENVELOPE' || (error.message && error.message.includes("Invalid recipient"))) {
    //     errorMessage = "There was an issue with the recipient or sender email address. Please contact the administrator.";
    //   }
    // }
    
    return {
      message: errorMessage,
      success: false,
      fieldValues: { name, email, message } 
    };
  }
}
