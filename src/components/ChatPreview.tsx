import { useChats } from "@/context/chats";
import { useMessages } from "@/context/messages";
import { deleteChat } from "@/firebase/chat/chat";
import { Chat } from "@/lib/validators/chat";
import clsx from "clsx";
import { Pencil, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ConfirmDialog } from "./ConfirmDialog";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleDeleteChat = async (id: string) => {
    const deletedChatId = await deleteChat(id);
    removeChat(deletedChatId);
    setActiveChat(chats[0].id);
  };

  const handleChangeChat = (id: string) => {
    removeAllMessages();
    setActiveChat(id);
  };

  return (
    <div
      className={clsx(
        "relative group p-2 hover:bg-slate-300 hover:cursor-pointer transition-all",
        className
      )}
      onClick={() => router.push("/")}
    >
      {messages.length > 1 ? (
        <ConfirmDialog
          text="Do you want to close current chat? Chat history will be removed."
          confirmCallback={() => handleChangeChat(id)}
          className="absolute top-0 left-0 w-full h-full"
        />
      ) : (
        <div
          className="absolute top-0 left-0 w-full h-full"
          onClick={() => handleChangeChat(id)}
        />
      )}

      <ConfirmDialog
        className="absolute top-2 right-2 hidden group-hover:block hover:text-white"
        triggerTitle="Delete chat"
        text="Do you really want to delete the chat?"
        confirmCallback={() => handleDeleteChat(id)}
      >
        <X />
      </ConfirmDialog>
      <a
        className="absolute top-2 right-10 hidden group-hover:block hover:text-white"
        title="Edit Chat"
        href="#"
      >
        <Pencil />
      </a>
      <h3 className="font-bold">{lessonTopic}</h3>
      <p className="text-sm">Grammar: {grammarTopic}</p>
      <p className="text-sm italic">{vocabulary}</p>
    </div>
  );
};
