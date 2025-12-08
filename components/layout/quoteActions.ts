"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email";
import QuoteRequestEmail from "@/emails/QuoteRequestEmail";

export interface QuoteRequestData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  description: string;
}

export async function submitQuoteRequest(formData: FormData) {
  const data: QuoteRequestData = {
    email: formData.get("email") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    phone: formData.get("phone") as string,
    description: formData.get("description") as string,
  };

  // Basic validation
  if (!data.email || !data.firstName) {
    return { error: "Email and First Name are required" };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("requested_quotes").insert([
    {
      email: data.email,
      name: `${data.firstName} ${data.lastName}`.trim(),
      phone: data.phone,
      description: data.description,
      cart_items: [],
      total_price: 0,
    },
  ]);

  if (error) {
    console.error("Quote request submission error:", error);

    return { error: "Failed to submit quote request. Please try again." };
  }

  // Send email notification
  const emailResult = await sendEmail({
    to: process.env.CONTACT_EMAIL || "admin@ferratisports.com",
    subject: `New Quote Request from ${data.firstName} ${data.lastName}`,
    react: QuoteRequestEmail({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      description: data.description,
    }),
  });

  if (emailResult.error) {
    console.error("Failed to send email notification:", emailResult.error);
    // Don't return error to user since form was saved successfully
  }

  // Revalidate the page to show fresh state
  revalidatePath("/");

  return { success: "Quote request submitted successfully!" };
}
