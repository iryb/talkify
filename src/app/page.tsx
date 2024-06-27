"use client";
import "regenerator-runtime/runtime";
import { Chat } from "@/app/components/Chat";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Chat />
    </main>
  );
}
