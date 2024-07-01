import clsx from "clsx";
import React from "react";

type MessageProps = {
  isUserMessage: boolean;
  text: string;
};

export const Message = ({ isUserMessage, text }: MessageProps) => {
  return (
    <div
      className={clsx(
        "p-2 border-slate-100 rounded-md",
        isUserMessage ? "bg-gray-300" : "bg-slate-400"
      )}
    >
      {text}
    </div>
  );
};
