
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

const RECIPIENT_EMAIL = process.env.CONTACT_FORM_RECIPIENT_EMAIL || "gabrielmancillas1034@icloud.com";
// Ensure these are set in your .env file for Nodemailer to work with Gmail
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

  // Temporarily bypass email sending if nodemailer is not configured
  // console.log("Form data validated. Email sending logic is currently commented out.");
  // console.log("Recipient:", RECIPIENT_EMAIL);
  // console.log("Sender Email (for Nodemailer config):", SENDER_EMAIL);
  // console.log("Intended submission data:", validatedFields.data);

  // return {
  //   message: "Thank you for your message! (Email sending is currently disabled for setup).",
  //   success: true,
  //   fieldValues: { name: "", email: "", message: "" } 
  // };


  if (!SENDER_EMAIL || !GMAIL_APP_PASSWORD) {
    console.error("Gmail credentials (GMAIL_EMAIL or GMAIL_APP_PASSWORD) are not set in environment variables.");
    return {
      message: "Server configuration error: Email credentials not set. Please contact the administrator. Your message was not sent.",
      success: false,
      fieldValues: { name, email, message }
    };
  }

  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: SENDER_EMAIL,
  //     pass: GMAIL_APP_PASSWORD, // Use the App Password here
  //   },
  // });

  // const mailOptions = {
  //   from: `"${validatedFields.data.name}" <${SENDER_EMAIL}>`, 
  //   to: RECIPIENT_EMAIL, 
  //   replyTo: validatedFields.data.email, 
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
    // console.log("Contact form email sent successfully to:", RECIPIENT_EMAIL);
    // // The line below should be uncommented once nodemailer is installed and configured.
    // // For now, we simulate success without actual email sending.
    console.log("Email sending logic reached, but transporter.sendMail is commented out.");
    console.log("Simulating successful email send for development.");
    return {
      message: "Thank you for your message! It has been sent successfully. (Actual email sending might be pending setup)",
      success: true,
      fieldValues: { name: "", email: "", message: "" } 
    };
  } catch (error) {
    console.error("Error sending contact form email (or during simulation):", error);
    let errorMessage = "An unexpected error occurred while sending your message. Please try again later.";
    // if (error instanceof Error && 'code' in error && (error as any).code === 'EAUTH') {
    //     errorMessage = "Email server authentication failed. Please check server configuration.";
    // } else if (error instanceof Error && 'code' in error && (error as any).code === 'EENVELOPE') {
    //     errorMessage = "Invalid recipient or sender email address. Please check server configuration.";
    // }
    
    return {
      message: errorMessage,
      success: false,
      fieldValues: { name, email, message } 
    };
  }
}
