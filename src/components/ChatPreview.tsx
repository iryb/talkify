import { useChats } from "@/context/chats";
import { Chat } from "@/lib/validators/chat";
import clsx from "clsx";
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

  const handleClick = () => {
    setActiveChat(id);
  };

  return (
    <div
      className={clsx(
        "p-2 hover:bg-slate-300 hover:cursor-pointer transition-all",
        className
      )}
      onClick={handleClick}
    >
      <h3 className="font-bold text-md">{lessonTopic}</h3>
      <p className="">Grammar: {grammarTopic}</p>
      <p>{vocabulary}</p>
    </div>
  );
};
