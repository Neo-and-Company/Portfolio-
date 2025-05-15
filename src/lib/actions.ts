
"use server";

import { z } from "zod";
// import nodemailer from 'nodemailer'; // Temporarily commented out - install nodemailer package

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
const SENDER_EMAIL = process.env.GMAIL_EMAIL; // Your Gmail address
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD; // Your Gmail App Password

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

  // Temporarily commented out email sending logic.
  // Please install nodemailer and uncomment the following block.
  /*
  if (!SENDER_EMAIL || !GMAIL_APP_PASSWORD) {
    console.error("Gmail credentials are not set in environment variables.");
    return {
      message: "Server configuration error: Email credentials not set. Please contact the administrator.",
      success: false,
      fieldValues: { name, email, message }
    };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SENDER_EMAIL,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${validatedFields.data.name}" <${SENDER_EMAIL}>`, // Send from your Gmail, but show sender's name
    to: RECIPIENT_EMAIL,
    replyTo: validatedFields.data.email, // So you can reply directly to the user
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
    // Temporarily commented out email sending logic.
    // await transporter.sendMail(mailOptions);
    // console.log("Contact form email sent successfully to:", RECIPIENT_EMAIL);
    console.log("Form data processed. Email sending is temporarily commented out. Recipient:", RECIPIENT_EMAIL, "Data:", validatedFields.data);
    return {
      // Adjust message to reflect that email sending is not yet active
      message: "Thank you for your message! It has been received. (Email sending is pending setup).",
      success: true,
      fieldValues: { name: "", email: "", message: "" }
    };
  } catch (error) {
    console.error("Error processing contact form (email sending part is commented out):", error);
    return {
      message: "An unexpected error occurred while processing your message. Please try again later or contact support.",
      success: false,
      fieldValues: { name, email, message }
    };
  }
}
