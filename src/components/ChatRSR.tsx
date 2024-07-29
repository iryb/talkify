import React, { useContext, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Chat as ChatProps } from "@/lib/validators/chat";
import { MessagesContext, useMessages } from "@/context/messages";
import { Message } from "./Message";
import { RecordingButton } from "./ui/RecordingButton";
import { nanoid } from "nanoid";
import { Button } from "./ui/Button";

export const ChatRSR = ({
  id,
  level,
  lessonTopic,
  grammarTopic,
  vocabulary,
  questions,
}: ChatProps) => {
  const { messages, addMessage } = useMessages();
  const [isRecording, setIsRecording] = useState(false);

  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleStart = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    setIsRecording(true);
  };

  const sendMessage = async (
    getFeedback = false
  ): Promise<{
    text: string;
  }> => {
    setIsRecording(false);
    SpeechRecognition.stopListening();

    const newMessage = {
      id: nanoid(),
      text: getFeedback ? "Get Feedback" : transcript,
      isUserMessage: true,
    };
    addMessage(newMessage);

    resetTranscript();

    const response = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [...messages, newMessage],
        level,
        lessonTopic,
        grammarTopic,
        vocabulary,
        questions,
      }),
    }).then((res) => res.json());

    addMessage({
      id: nanoid(),
      text: response.text,
      isUserMessage: false,
    });

    return response;
  };

  const speak = (text: string) => {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleStop = async () => {
    if (transcript.length === 0) return;

    const response = await sendMessage();
    speak(response.text);
  };

  const handleFinishChat = async () => {
    await sendMessage(true);
  };

  return (
    <div className="">
      <div className="border-b p-4 mb-4">
        <h1 className="text-xl font-bold">Topic: {lessonTopic}</h1>
        <h2 className="">Grammar: {grammarTopic}</h2>
        {vocabulary && (
          <p className="text-sm italic">Vocabulary: {vocabulary}</p>
        )}
      </div>
      <div className="overflow-y-scroll h-[calc(100vh-4rem-120px-95px)] scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch py-4 px-8 flex flex-col gap-2">
        {messages.map(({ isUserMessage, text }, index) => (
          <Message key={index} isUserMessage={isUserMessage} text={text} />
        ))}
      </div>
      <div className="fixed bottom-0 w-full md:left-1/4 md:w-3/4 flex justify-center gap-4 p-4 mt-4 border-t bg-white">
        <RecordingButton
          startRecordingCallback={handleStart}
          stopRecordingCallback={handleStop}
          isActive={isRecording}
        />
        <Button onClick={handleFinishChat} disabled={!(messages.length > 2)}>
          Get Feedback
        </Button>
      </div>
    </div>
  );
};
