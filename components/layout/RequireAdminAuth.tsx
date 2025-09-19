"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RequireAdminAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session?.user;
      // You can add more robust admin check here (e.g., user.role === 'admin')
      if (!user) {
        router.replace("/login?redirect=/admin");
      }
    };
    checkAuth();
  }, [router]);

  return <>{children}</>;
}
