import { Chat } from "@/lib/validators/chat";
import React from "react";
import { ChatPreview } from "./ChatPreview";

const mockChats: Chat[] = [
  {
    id: "1",
    lessonTopic: "Unit 1",
    grammarTopic: "Modals",
    vocabulary: "word1, word2, word3",
  },
  {
    id: "2",
    lessonTopic: "Unit 2",
    grammarTopic: "Modals",
    vocabulary: "word1, word2, word3",
  },
  {
    id: "3",
    lessonTopic: "Unit 3",
    grammarTopic: "Modals",
    vocabulary: "word1, word2, word3",
  },
  {
    id: "4",
    lessonTopic: "Unit 4",
    grammarTopic: "Modals",
    vocabulary: "word1, word2, word3",
  },
];

export const Sidebar = () => {
  return (
    <div className="bg-slate-100 w-1/4 border-r border-slate-300 p-4">
      {mockChats.map(({ id, lessonTopic, grammarTopic, vocabulary }, index) => (
        <ChatPreview
          key={id}
          lessonTopic={lessonTopic}
          grammarTopic={grammarTopic}
          vocabulary={vocabulary}
          id={id}
          className={
            index === mockChats.length - 1 ? "" : "border-b border-slate-300"
          }
        />
      ))}
    </div>
  );
};
