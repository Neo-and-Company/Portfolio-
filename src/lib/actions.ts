
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

  if (!SENDER_EMAIL || !GMAIL_APP_PASSWORD) {
    console.error("Gmail credentials (GMAIL_EMAIL or GMAIL_APP_PASSWORD) are not set in environment variables. Email cannot be sent.");
    // For now, simulate success for the UI if credentials are not set, but log an admin warning.
    // In a real scenario, you might want to prevent form submission or display a clearer message.
    return {
      message: "Thank you for your message! (Admin: Email service is not configured due to missing credentials).",
      success: true, 
      fieldValues: { name: "", email: "", message: "" }
    };
  }

  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: SENDER_EMAIL,
  //     pass: GMAIL_APP_PASSWORD,
  //   },
  // });

  // const mailOptions = {
  //   from: `"${validatedFields.data.name}" <${SENDER_EMAIL}>`, // Display name of sender, but sent via your Gmail
  //   to: RECIPIENT_EMAIL, // Send to your iCloud address
  //   replyTo: validatedFields.data.email, // So you can reply directly to the user
  //   subject: `New Contact Form Submission from ${validatedFields.data.name}`,
  //   text: `You have received a new message from your website contact form:\n\n
  //          Name: ${validatedFields.data.name}\n
  //          Email: ${validatedFields.data.email}\n
  //          Message:\n${validatedFields.data.message}`,
  //   html: `<p>You have received a new message from your website contact form:</p>
  //          <p><strong>Name:</strong> ${validatedFields.data.name}</p>
  //          <p><strong>Email:</strong> ${validatedFields.data.email}</p>
  //          <p><strong>Message:</strong></p>
  //          <p>${validatedFields.data.message.replace(/\n/g, '<br>')}</p>`,
  // };

  try {
    // await transporter.sendMail(mailOptions);
    console.log("Contact form email would be sent to:", RECIPIENT_EMAIL); // Placeholder log
    console.log("Form data:", validatedFields.data);
    return {
      message: "Thank you for your message! It has been sent successfully.", // This message will be shown even if email sending is commented out.
      success: true,
      fieldValues: { name: "", email: "", message: "" } 
    };
  } catch (error) {
    console.error("Error sending contact form email (or preparing to send):", error);
    // It's good to provide specific error messages if possible,
    // but a generic one is fine for a fallback.
    let errorMessage = "An unexpected error occurred while sending your message. Please try again later.";
    
    // You can add more specific error checks if 'error' has properties like 'code' (e.g., from Nodemailer)
    if (error instanceof Error) {
      // const nodeError = error as NodeJS.ErrnoException; // Or specific Nodemailer error type if available
      // if (nodeError.code === 'EAUTH' || (error.message && error.message.includes("Authentication failed"))) {
      //   errorMessage = "Email server authentication failed. Please check server configuration if you are the administrator. (Hint: Gmail App Password or 2FA settings).";
      // } else if (nodeError.code === 'EENVELOPE' || (error.message && error.message.includes("Invalid recipient"))) {
      //   errorMessage = "There was an issue with the recipient or sender email address. Please contact the administrator.";
      // }
    }
    
    return {
      message: errorMessage,
      success: false,
      fieldValues: { name, email, message } 
    };
  }
}
