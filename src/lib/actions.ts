
"use server";

import { z } from "zod";
import { sendContactEmail, addEmailSubscription, verifyEmailExists } from "./email-service";

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

const RECIPIENT_EMAIL = "gabrielleolukotun@gmail.com"; // Your main email where you'll receive contact forms

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

  // Send email using the email service
  try {
    const emailResult = await sendContactEmail({
      name: validatedFields.data.name,
      email: validatedFields.data.email,
      message: validatedFields.data.message,
    });

    if (!emailResult.success) {
      console.error("Email sending failed:", emailResult.error);
      return {
        message: "Message received but email delivery failed. I'll still get back to you!",
        success: true, // Still show success to user
        fieldValues: { name: "", email: "", message: "" }
      };
    }

    console.log("✅ Contact form email sent successfully:", emailResult.messageId);
    return {
      message: "Thank you for your message! I'll get back to you soon about opportunities.",
      success: true,
      fieldValues: { name: "", email: "", message: "" }
    };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      message: "Thank you for your message! I'll get back to you soon about opportunities.",
      success: true, // Still show success to user even if email fails
      fieldValues: { name: "", email: "", message: "" }
    };
  }
}

// Email subscription schema and types
const subscriptionSchema = z.object({
  email: z.string().email("Invalid email address."),
});

export type SubscriptionFormState = {
  message: string;
  success: boolean;
  errors?: {
    email?: string[];
  };
};

export async function submitEmailSubscription(
  prevState: SubscriptionFormState,
  formData: FormData
): Promise<SubscriptionFormState> {
  const email = formData.get("email") as string;

  const validatedFields = subscriptionSchema.safeParse({
    email,
  });

  if (!validatedFields.success) {
    return {
      message: "Subscription failed. Please check your email address.",
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Verify email exists and add to subscription list
  try {
    const isValidEmail = await verifyEmailExists(validatedFields.data.email);

    if (!isValidEmail) {
      return {
        message: "Please provide a valid email address.",
        success: false,
        errors: { email: ["Invalid or disposable email address"] },
      };
    }

    const subscriptionResult = await addEmailSubscription(validatedFields.data.email);

    if (!subscriptionResult.success) {
      console.error("Subscription storage failed:", subscriptionResult.error);
      return {
        message: "Subscription failed. Please try again.",
        success: false,
      };
    }

    console.log("✅ Email subscription added successfully:", validatedFields.data.email);
    return {
      message: "Thank you for subscribing! You'll hear from me soon about opportunities.",
      success: true,
    };
  } catch (error) {
    console.error("Email subscription error:", error);
    return {
      message: "Subscription failed. Please try again.",
      success: false,
    };
  }
}
