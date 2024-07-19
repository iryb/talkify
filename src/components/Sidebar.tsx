import React from "react";
import { ChatPreview } from "./ChatPreview";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useChats } from "@/context/chats";
import { sortChatsByDate } from "@/lib/utils";

export const Sidebar = () => {
  const { chats } = useChats();
  const sortedChats = sortChatsByDate(chats);

  return (
    <div className="relative bg-slate-100 w-1/4 border-r border-slate-300 px-4 py-8">
      <h2 className="mb-2 px-2 font-bold text-lg">Recent chats</h2>
      <Link
        className="absolute right-4 top-8"
        href="/add-chat"
        title="Add New Chat"
      >
        <Plus />
      </Link>
      {sortedChats.length > 0 && (
        <div>
          {sortedChats.map(
            (
              {
                id,
                lessonTopic,
                grammarTopic,
                vocabulary,
                level,
                createdAt,
                modifiedAt,
              },
              index
            ) => (
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
                createdAt={createdAt}
                modifiedAt={modifiedAt}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};
