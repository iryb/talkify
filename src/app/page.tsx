"use client";
import "regenerator-runtime/runtime";
import { Chat } from "@/components/Chat";
export default function Home() {
  return (
    <Chat
      id="123"
      lessonTopic="Accommodations"
      grammarTopic="Modals"
      vocabulary="word1, word2, word3, word4"
      level={""}
    />
  );
}
