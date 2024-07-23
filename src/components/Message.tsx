import clsx from "clsx";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { useAuth } from "@/context/auth";

type MessageProps = {
  isUserMessage: boolean;
  text: string;
};

export const Message = ({ isUserMessage, text }: MessageProps) => {
  const { currentUser } = useAuth();
  const userName = currentUser ? currentUser.email?.slice(0, 2) : "You";
  return (
    <div
      className={clsx("flex gap-4 w-full", {
        "flex-row-reverse": isUserMessage,
      })}
    >
      {isUserMessage ? (
        <Avatar>
          <AvatarFallback>
            <span className="uppercase font-bold">{userName}</span>
          </AvatarFallback>
        </Avatar>
      ) : (
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>
            <span className="uppercase font-bold">TF</span>
          </AvatarFallback>
        </Avatar>
      )}
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
