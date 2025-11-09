"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ToastProvider } from "@heroui/toast";
import NextTopLoader from "nextjs-toploader";

import SmoothScrollProvider from "@/components/SmoothScrollProvider";
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  // useEffect(() => {
  //   createChat({
  //     webhookUrl:
  //       "https://rafayiscool.online/webhook/a5358191-0662-494e-80a4-8345279eadb3/chat",
  //     initialMessages: [
  //       "Hi there! I'm here to help you with any questions you have about Ferrati Sports.",
  //     ],
  //   });
  // }, []);

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <NextTopLoader color="#fc7521" showSpinner={false} />
        <ToastProvider />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        {/* <CustomChatWidget /> */}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
