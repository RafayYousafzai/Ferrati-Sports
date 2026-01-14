"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { sendPushoverNotification } from "@/lib/pushover";

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

  // Send Pushover notification
  await sendPushoverNotification({
    type: "contact",
    name: `${data.firstName} ${data.lastName}`.trim(),
    email: data.email,
    phone: data.phone,
    description: data.interest,
  });

  // Revalidate the page to show fresh state
  revalidatePath("/contact");

  return { success: "Your message has been sent!" };
}
