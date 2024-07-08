import { Chat } from "@/lib/validators/chat";
import clsx from "clsx";
import React from "react";

interface ChatPreviewProps extends Chat {
  className?: string;
}

export const ChatPreview = ({
  lessonTopic,
  grammarTopic,
  vocabulary,
  className,
}: ChatPreviewProps) => {
  return (
    <div className={clsx("p-2", className)}>
      <h3 className="font-bold text-md">{lessonTopic}</h3>
      <p className="">Grammar: {grammarTopic}</p>
      <p>{vocabulary}</p>
    </div>
  );
};
