"use client";
import { MessagesContext } from "@/context/messages";
import React, { useContext, useEffect, useState } from "react";
import { Message } from "@/components/Message";
import { RecordingButton } from "./ui/RecordingButton";

export const Chat = () => {
  const listening = false;
  const [transcript, setTranscript] = useState<string>();
  const messagesContext = useContext(MessagesContext);
  const [isRecording, setIsRecording] = useState(false);

  // const { mutate: sendMessage, isPending: isLoading } = useMutation({
  //     mutationFn: async (message: Message) => {
  // const response = await fetch("/api/message", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ messages: [message] }),
  // });

  // if (!response.ok) {
  //   throw new Error();
  // }

  // return response.body;
  //     },
  //     onMutate(message) {
  //       addMessage(message);
  //     },
  //     onSuccess: async (stream) => {
  //       if (!stream) throw new Error("No stream found");

  //       const id = nanoid();
  //       const responseMessage: Message = {
  //         id,
  //         isUserMessage: false,
  //         text: "",
  //       };

  //       addMessage(responseMessage);

  //       setIsMessageUpdating(true);

  //       const reader = stream.getReader();
  //       const decoder = new TextDecoder();
  //       let done = false;

  //       while (!done) {
  //         const { value, done: doneReading } = await reader.read();
  //         done = doneReading;
  //         const chunkValue = decoder.decode(value);
  //         updateMessage(id, (prev) => prev + chunkValue);
  //       }

  //       setIsMessageUpdating(false);
  //       setInput("");
  //       setTimeout(() => textareaRef.current?.focus(), 10);
  //     },
  //     onError(_, message) {
  //       toast.error("Something went wrong. Please try again.");
  //       removeMessage(message.id);
  //       textareaRef.current?.focus();
  //     },
  //   });

  const handleStart = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    setIsRecording(true);
    recognition.onresult = async function (event) {
      const input = event.results[0][0].transcript;

      console.log(event);
      setTranscript(input);

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
          langLevel: "b1",
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

    recognition.start();
  };

  const handleStop = () => {};

  return (
    <div className="max-w-md w-full">
      <h1>Topic: Accommodations</h1>
      <button>Add New Chat</button>
      <div className="overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        {messagesContext.messages.map(({ isUserMessage, text }, index) => (
          <Message key={index} isUserMessage={isUserMessage} text={text} />
        ))}
      </div>
      <div className="flex justify-center gap-4 p-4 mt-4 border-t border-slate-400">
        <RecordingButton
          startRecordingCallback={handleStart}
          stopRecordingCallback={handleStop}
          isActive={isRecording}
        />
      </div>
    </div>
  );
};
