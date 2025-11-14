import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";

import { Toaster } from "@/app/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Gov Pro",
  description: "Government Protection Against Cyber Attacks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {children}
        <Toaster richColors theme="light" position="top-right" />
      </body>
    </html>
  );
}
