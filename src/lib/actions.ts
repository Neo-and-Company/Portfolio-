
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

const RECIPIENT_EMAIL = "gabrielmancillas1034@icloud.com"; 

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

  // Email sending logic has been removed.
  // You can add integration with an email service here if needed in the future.
  console.log("Contact form submitted. Email sending is not configured.");
  console.log("Recipient (intended):", RECIPIENT_EMAIL);
  console.log("Form data:", validatedFields.data);

  return {
    message: "Thank you for your message! It has been received (email functionality is currently disabled).",
    success: true,
    fieldValues: { name: "", email: "", message: "" } 
  };
}
