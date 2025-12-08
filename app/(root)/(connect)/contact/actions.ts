"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email";
import ContactFormEmail from "@/emails/ContactFormEmail";

export interface ContactFormData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  interest: string;
}

export async function submitContactForm(formData: FormData) {
  const data: ContactFormData = {
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    interest: formData.get("interest") as string,
  };

  // Basic validation
  if (!data.email || !data.firstName) {
    return { error: "Email and First Name are required" };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("contact_requests").insert([
    {
      email: data.email,
      phone: data.phone,
      name: `${data.firstName} ${data.lastName}`.trim(),
      interest: data.interest,
    },
  ]);

  if (error) {
    console.error("Contact form submission error:", error);

    return { error: "Failed to send message. Please try again." };
  }

  // Send email notification
  const emailResult = await sendEmail({
    to: process.env.CONTACT_EMAIL || "admin@ferratisports.com",
    subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
    react: ContactFormEmail({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      interest: data.interest,
    }),
  });

  if (emailResult.error) {
    console.error("Failed to send email notification:", emailResult.error);
    // Don't return error to user since form was saved successfully
  }

  // Revalidate the page to show fresh state
  revalidatePath("/contact");

  return { success: "Your message has been sent!" };
}
