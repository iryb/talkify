import React from "react";
import { ChatPreview } from "./ChatPreview";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useChats } from "@/context/chats";

export const Sidebar = () => {
  const { chats } = useChats();

  return (
    <div className="relative bg-slate-100 w-1/4 border-r border-slate-300 px-4 py-8 -my-2">
      <Link
        className="absolute right-4 top-8"
        href="/add-chat"
        title="Add New Chat"
      >
        <Plus />
      </Link>
      {chats.length > 0 && (
        <div>
          {chats.map(
            ({ id, lessonTopic, grammarTopic, vocabulary, level }, index) => (
              <ChatPreview
                key={index}
                lessonTopic={lessonTopic}
                grammarTopic={grammarTopic}
                vocabulary={vocabulary}
                id={id}
                className={
                  index === chats.length - 1 ? "" : "border-b border-slate-300"
                }
                level={level}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};
