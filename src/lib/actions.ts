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
  // For this example, we'll just log it and simulate success.
  console.log("Contact form submission received:");
  console.log("Name:", validatedFields.data.name);
  console.log("Email:", validatedFields.data.email);
  console.log("Message:", validatedFields.data.message);

  // Simulate an API call or email sending process
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    // Example: await sendEmail(validatedFields.data);
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
