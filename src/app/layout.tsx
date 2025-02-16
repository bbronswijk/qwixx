import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import { Authenticate } from "@/auth/authenticate";
import { CookiesProvider } from "next-client-cookies/server";
import { Toaster } from "@/ui/toaster";

export const metadata: Metadata = {
  title: "Qwixx",
  description: "Generated by create next app",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  authors: [
    { name: "Bram Bronswijk" },
    {
      name: "Bram Bronswijk",
      url: "https://brambronswijk.com",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "256x256.jpg" },
    { rel: "icon", url: "256x256.jpg" },
  ],
};

export const viewport: Viewport = {
  themeColor: "black",
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='h-svh'>
        <CookiesProvider>
          <Authenticate>{children}</Authenticate>
        </CookiesProvider>
        <Toaster />
      </body>
    </html>
  );
}
