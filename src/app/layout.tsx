"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { MessagesProvider } from "@/context/messages";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MessagesProvider>
        <body className={inter.className}>{children}</body>
      </MessagesProvider>
    </html>
  );
}
