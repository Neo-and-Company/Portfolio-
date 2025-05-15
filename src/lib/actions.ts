"use server";

import { z } from "zod";

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

// Define the recipient email address
const RECIPIENT_EMAIL = process.env.CONTACT_FORM_RECIPIENT_EMAIL || "gabrielmancillas1034@icloud.com";

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

  // In a real application, you would send an email or save to a database here.
  console.log("Contact form submission received:");
  console.log("Recipient Email:", RECIPIENT_EMAIL);
  console.log("Name:", validatedFields.data.name);
  console.log("Email:", validatedFields.data.email);
  console.log("Message:", validatedFields.data.message);

  // Simulate an API call or email sending process
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    // TODO: Implement actual email sending logic here
    // Example using a hypothetical sendEmail function:
    // await sendEmail({
    //   to: RECIPIENT_EMAIL,
    //   from: validatedFields.data.email, // Or a "no-reply" address from your domain
    //   subject: `New Contact Form Submission from ${validatedFields.data.name}`,
    //   text: validatedFields.data.message,
    //   html: `<p><strong>Name:</strong> ${validatedFields.data.name}</p>
    //          <p><strong>Email:</strong> ${validatedFields.data.email}</p>
    //          <p><strong>Message:</strong></p>
    //          <p>${validatedFields.data.message}</p>`,
    // });

    console.log(`Simulating email send to ${RECIPIENT_EMAIL}`);

    return {
      message: "Thank you for your message! We'll get back to you soon.",
      success: true,
      fieldValues: { name: "", email: "", message: "" } // Clear fields on success
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      message: "An unexpected error occurred while sending your message. Please try again later.",
      success: false,
      fieldValues: { name, email, message }
    };
  }
}
