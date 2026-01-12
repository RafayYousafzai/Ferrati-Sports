import "../styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Cormorant_Upright, Open_Sans } from "next/font/google";

import { Providers } from "./providers";
import WhatsAppButton from "@/components/whatsapp-button";

import { siteConfig } from "@/config/site";

const cormorant_upright = Cormorant_Upright({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant_upright",
});

const open_sans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open_sans",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "DSXRY_YFR5Dx5hEuHDWjufVOYP33KlGC4uiZzJA0PG8",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground font-sans antialiased ",
          cormorant_upright.variable,
          open_sans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col min-h-screen">
            <main className="flex-grow bg-slate-50">{children}</main>
          </div>
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
