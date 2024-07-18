import { useChats } from "@/context/chats";
import { Chat } from "@/lib/validators/chat";
import clsx from "clsx";
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
  const { setActiveChat } = useChats();

  return (
    <div
      className={clsx(
        "p-2 hover:bg-slate-300 hover:cursor-pointer transition-all",
        className
      )}
      onClick={() => setActiveChat(id)}
    >
      <Link href="/">
        <h3 className="font-bold text-md">{lessonTopic}</h3>
        <p className="">Grammar: {grammarTopic}</p>
        <p>{vocabulary}</p>
      </Link>
    </div>
  );
};
