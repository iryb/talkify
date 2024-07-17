"use client";
import "regenerator-runtime/runtime";
import { Chat } from "@/components/Chat";
import { useChats } from "@/context/chats";
export default function Home() {
  const { chats, activeChatId } = useChats();
  const [{ lessonTopic, grammarTopic, vocabulary, level }] = chats.filter(
    (chat) => chat.id === activeChatId
  );

  return (
    <Chat
      id={activeChatId}
      lessonTopic={lessonTopic}
      grammarTopic={grammarTopic}
      vocabulary={vocabulary}
      level={level}
    />
  );
}
