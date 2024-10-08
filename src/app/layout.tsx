"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { MessagesProvider } from "@/context/messages";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { AuthProvider } from "@/context/auth";
import { ChatsProvider } from "@/context/chats";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <ChatsProvider>
          <MessagesProvider>
            <body className={inter.className}>
              <Header />
              <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
                <Sidebar />
                <div className="w-full md:w-3/4">{children}</div>
              </div>
            </body>
          </MessagesProvider>
        </ChatsProvider>
      </AuthProvider>
    </html>
  );
}
