"use client";
import { MessagesContext } from "@/context/messages";
import React, { useContext, useEffect, useState } from "react";

export const Chat = () => {
  const listening = false;
  const [transcript, setTranscript] = useState<string>();
  const [response, setResponse] = useState<string>();
  const messagesContext = useContext(MessagesContext);

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
    recognition.onresult = async function (event) {
      const input = event.results[0][0].transcript;

      console.log(event);
      setTranscript(input);

      messagesContext.addMessage({
        id: "2",
        text: input,
        isUserMessage: true,
      });

      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [{
          id: "123",
          isUserMessage: true,
          text: input,
        }], langLevel: "b1" }),
      }).then((res) => res.json());

      console.log(response)

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
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      {messagesContext.messages.map(({isUserMessage, text}, index) => (
        <div key={index} style={{backgroundColor: (isUserMessage ? "grey" : "blue")}}>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
};
