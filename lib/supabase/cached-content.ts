import { cache } from "react";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

async function getSupabase() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // ignore when called from Server Component
        }
      },
    },
  });
}

export type ExploreItem = {
  id: string;
  type: "problem" | "solution";
  description: string;
  sort_order: number;
};

export const getCachedExploreItems = cache(async (): Promise<ExploreItem[]> => {
  const supabase = await getSupabase();
  const { data } = await supabase
    .from("explore_items")
    .select("*")
    .order("sort_order", { ascending: true });

  return (data as ExploreItem[]) ?? [];
});

export type WhyChooseUsItem = {
  id: string;
  title: string;
  description: string;
  icon: "building" | "store" | "settings" | "lightbulb";
  sort_order: number;
};

export const getCachedWhyChooseUs = cache(
  async (): Promise<WhyChooseUsItem[]> => {
    const supabase = await getSupabase();
    const { data } = await supabase
      .from("why_choose_us")
      .select("*")
      .order("sort_order", { ascending: true });

    return (data as WhyChooseUsItem[]) ?? [];
  },
);

export type ProcessService = {
  id: string;
  name: string;
  sort_order: number;
  step_id: string;
};

export type ProcessStep = {
  id: string;
  title: string;
  icon: string | null;
  href: string | null;
  sort_order: number;
  services: ProcessService[];
};

export const getCachedProcessSteps = cache(async (): Promise<ProcessStep[]> => {
  const supabase = await getSupabase();
  const { data: steps } = await supabase
    .from("process_steps")
    .select("*")
    .order("sort_order", { ascending: true });

  if (!steps?.length) return [];

  const stepIds = (steps as any[]).map((s) => s.id);
  const { data: services } = await supabase
    .from("process_step_services")
    .select("*")
    .in("step_id", stepIds)
    .order("sort_order", { ascending: true });

  const byStep = new Map<string, ProcessService[]>();

  (services as any[])?.forEach((s) => {
    if (!byStep.has(s.step_id)) byStep.set(s.step_id, []);
    byStep.get(s.step_id)!.push(s);
  });

  return (steps as any[]).map((s) => ({
    ...s,
    services: byStep.get(s.id) || [],
  }));
});
