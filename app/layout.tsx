import type { Metadata } from "next";
import "./globals.css";
import { poppin } from "./constants";
import { ThemeProvider } from "./components/ui";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

export const metadata: Metadata = {
  title: "CalenNexus",
  description: "Scheduling a meeting can be a pain. But we at CalenNexus make it easy for your clients to schedule meetings with you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${poppin.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextSSRPlugin
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
