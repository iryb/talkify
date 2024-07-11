import clsx from "clsx";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type MessageProps = {
  isUserMessage: boolean;
  text: string;
};

export const Message = ({ isUserMessage, text }: MessageProps) => {
  return (
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div
        className={clsx(
          "p-2 border-slate-100 rounded-md max-w-max",
          isUserMessage
            ? "bg-gray-300 rounded-br-none"
            : "bg-slate-500 text-white rounded-bl-none"
        )}
      >
        {text}
      </div>
    </div>
  );
};
