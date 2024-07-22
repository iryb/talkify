"use client";
import { MessagesContext } from "@/context/messages";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Message } from "@/components/Message";
import { RecordingButton } from "./ui/RecordingButton";
import { Chat as ChatProps } from "@/lib/validators/chat";

export const Chat = ({
  id,
  level,
  lessonTopic,
  grammarTopic,
  vocabulary,
  questions,
}: ChatProps) => {
  const messagesContext = useContext(MessagesContext);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition>();

  const handleStart = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;

    setIsRecording(true);

    recognitionRef.current.onresult = async function (event) {
      const input = event.results[0][0].transcript;

      console.log(event);

      const newMessage = {
        id: "2",
        text: input,
        isUserMessage: true,
      };

      messagesContext.addMessage(newMessage);

      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messagesContext.messages, newMessage],
          level,
          lessonTopic,
          grammarTopic,
          vocabulary,
          questions,
        }),
      }).then((res) => res.json());

      setIsRecording(false);

      console.log(response);

      messagesContext.addMessage({
        id: "3",
        text: response.text,
        isUserMessage: false,
      });

      let utterance = new SpeechSynthesisUtterance(response.text);
      utterance.lang = "en-US";

      window.speechSynthesis.speak(utterance);
    };

    recognitionRef.current.start();
  };

  const handleStop = () => {
    setIsRecording(false);
    recognitionRef.current?.stop();
  };

  return (
    <div className="">
      <div className="border-b p-8 mb-4">
        <h1 className="text-xl font-bold">Topic: {lessonTopic}</h1>
        <h2 className="text-lg">Grammar: {grammarTopic}</h2>
        <p>Vocabulary: {vocabulary}</p>
      </div>
      <div className="overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch py-4 px-8 flex flex-wrap gap-2">
        {messagesContext.messages.map(({ isUserMessage, text }, index) => (
          <Message key={index} isUserMessage={isUserMessage} text={text} />
        ))}
      </div>
      <div className="fixed bottom-0 left-1/4 w-3/4 flex justify-center gap-4 p-4 mt-4 border-t">
        <RecordingButton
          startRecordingCallback={handleStart}
          stopRecordingCallback={handleStop}
          isActive={isRecording}
        />
      </div>
    </div>
  );
};
