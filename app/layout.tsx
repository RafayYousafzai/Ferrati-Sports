import "../styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Cormorant_Upright, Open_Sans } from "next/font/google";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import Script from "next/script";

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
          "min-h-screen text-foreground bg-background font-sans antialiased",
          cormorant_upright.variable,
          open_sans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col min-h-screen">
            <main className="flex-grow">
              {children}
              <Script
                id="botsonic-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
              (function (w, d, s, o, f, js, fjs) {
                w["botsonic_widget"] = o;
                w[o] =
                  w[o] ||
                  function () {
                    (w[o].q = w[o].q || []).push(arguments);
                  };
                (js = d.createElement(s)), (fjs = d.getElementsByTagName(s)[0]);
                js.id = o;
                js.src = f;
                js.async = 1;
                fjs.parentNode.insertBefore(js, fjs);
              })(window, document, "script", "Botsonic", "https://widget.botsonic.com/CDN/botsonic.min.js");
              Botsonic("init", {
                serviceBaseUrl: "https://ferrati-sports.vercel.app/",
                token: "d25c3f41-166c-4890-a6a5-76e74ad7c518",
              });
            `,
                }}
              />
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
