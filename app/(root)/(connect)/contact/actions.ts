"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

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

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

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

  // Revalidate the page to show fresh state
  revalidatePath("/contact");

  return { success: "Your message has been sent!" };
}
