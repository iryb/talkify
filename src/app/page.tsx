"use client";
import "regenerator-runtime/runtime";
import { Chat } from "@/components/Chat";
import { useChats } from "@/context/chats";
import { ChatRSR } from "@/components/ChatRSR";
export default function Home() {
  const { chats, activeChatId } = useChats();
  let activeChat = null;

  if (activeChatId) {
    activeChat = chats.filter((chat) => chat.id === activeChatId)[0];
  }
  return (
    activeChat && (
      <ChatRSR
        id={activeChatId}
        lessonTopic={activeChat.lessonTopic}
        grammarTopic={activeChat.grammarTopic}
        vocabulary={activeChat.vocabulary}
        level={activeChat.level}
        createdAt={activeChat.createdAt}
        modifiedAt={activeChat.modifiedAt}
      />
    )
  );
}
