
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

  // Temporarily simulate success until nodemailer is installed and configured
  console.log("Contact form submitted (email sending temporarily disabled):");
  console.log("Recipient:", RECIPIENT_EMAIL);
  console.log("Sender (configured in .env):", SENDER_EMAIL);
  console.log("Data:", validatedFields.data);

  if (!SENDER_EMAIL || !GMAIL_APP_PASSWORD) {
    console.error("Gmail credentials (GMAIL_EMAIL or GMAIL_APP_PASSWORD) are not set in environment variables. Email cannot be sent even if nodemailer was active.");
    // Still return a user-friendly message, but make it clear it's a config issue for when email is re-enabled
    return {
      message: "Thank you for your message! (Note to admin: Email service is not yet fully configured).",
      success: true, // Simulate success for UI
      fieldValues: { name: "", email: "", message: "" }
    };
  }

  /*
  // --- Temporarily commented out Nodemailer logic ---
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SENDER_EMAIL, // Your Gmail address from .env
      pass: GMAIL_APP_PASSWORD, // Your Gmail App Password from .env
    },
  });

  const mailOptions = {
    from: `"${validatedFields.data.name}" <${SENDER_EMAIL}>`, // Shows sender's name but email is sent via your Gmail
    to: RECIPIENT_EMAIL, // The email address that will receive the form submissions
    replyTo: validatedFields.data.email, // So you can reply directly to the person who submitted the form
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

  try {
    await transporter.sendMail(mailOptions);
    console.log("Contact form email sent successfully to:", RECIPIENT_EMAIL);
    return {
      message: "Thank you for your message! It has been sent successfully.",
      success: true,
      fieldValues: { name: "", email: "", message: "" } 
    };
  } catch (error) {
    console.error("Error sending contact form email:", error);
    let errorMessage = "An unexpected error occurred while sending your message. Please try again later.";
    
    // You can add more specific error handling if needed
    // For example, checking error.code for 'EAUTH' (authentication failure) or 'EENVELOPE' (address issues)
    // if (error instanceof Error && 'code' in error) {
    //   const nodeError = error as NodeJS.ErrnoException;
    //   if (nodeError.code === 'EAUTH') {
    //     errorMessage = "Email server authentication failed. Please check server configuration if you are the administrator.";
    //   } else if (nodeError.code === 'EENVELOPE') {
    //     errorMessage = "There was an issue with the recipient or sender email address. Please contact the administrator.";
    //   }
    // }
    
    return {
      message: errorMessage,
      success: false,
      fieldValues: { name, email, message } 
    };
  }
  // --- End of temporarily commented out Nodemailer logic ---
  */

  // Simulate success if Nodemailer logic is commented out
  return {
    message: "Thank you for your message! It has been received (email sending is currently pending setup).",
    success: true,
    fieldValues: { name: "", email: "", message: "" }
  };
}
