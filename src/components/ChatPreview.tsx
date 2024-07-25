import { useChats } from "@/context/chats";
import { useMessages } from "@/context/messages";
import { deleteChat } from "@/firebase/chat/chat";
import { Chat } from "@/lib/validators/chat";
import clsx from "clsx";
import { Pencil, X } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ChatPreviewProps extends Chat {
  className?: string;
}

export const ChatPreview = ({
  id,
  lessonTopic,
  grammarTopic,
  vocabulary,
  className,
}: ChatPreviewProps) => {
  const { chats, setActiveChat, removeChat } = useChats();
  const { messages, removeAllMessages } = useMessages();

  const handleDeleteChat = async (id: string) => {
    const deleteChatConfirm = confirm("Do you really want to delete the chat?");
    if (deleteChatConfirm) {
      const deletedChatId = await deleteChat(id);
      removeChat(deletedChatId);
      setActiveChat(chats[0].id);
    }
  };

  const handleChangeChat = (id: string) => {
    if (messages.length > 1) {
      const closeChat = confirm(
        "Do you want to close current chat? Chat history will be removed."
      );
      if (closeChat) {
        removeAllMessages();
        setActiveChat(id);
      }
    } else {
      setActiveChat(id);
    }
  };

  return (
    <div
      className={clsx(
        "relative group p-2 hover:bg-slate-300 hover:cursor-pointer transition-all",
        className
      )}
      onClick={() => handleChangeChat(id)}
    >
      <a
        className="absolute top-2 right-2 hidden group-hover:block hover:text-white"
        title="Delete Chat"
        href="#"
        onClick={() => handleDeleteChat(id)}
      >
        <X />
      </a>
      <a
        className="absolute top-2 right-10 hidden group-hover:block hover:text-white"
        title="Edit Chat"
        href="#"
      >
        <Pencil />
      </a>
      <Link href="/">
        <h3 className="font-bold">{lessonTopic}</h3>
        <p className="text-sm">Grammar: {grammarTopic}</p>
        <p className="text-sm italic">{vocabulary}</p>
      </Link>
    </div>
  );
};
