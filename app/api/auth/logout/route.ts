import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server.js";

export async function POST() {
  const supabase = await createClient();

  // Sign out the user
  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Revalidate paths to clear any cached data
  revalidatePath("/", "layout");

  return NextResponse.json({ success: true });
}
