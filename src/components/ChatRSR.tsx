import React, { useContext, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Chat as ChatProps } from "@/lib/validators/chat";
import { MessagesContext } from "@/context/messages";
import { Message } from "./Message";
import { RecordingButton } from "./ui/RecordingButton";
import { nanoid } from "nanoid";

export const ChatRSR = ({
  id,
  level,
  lessonTopic,
  grammarTopic,
  vocabulary,
  questions,
}: ChatProps) => {
  const messagesContext = useContext(MessagesContext);
  const [isRecording, setIsRecording] = useState(false);

  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleStart = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    setIsRecording(true);
  };

  const handleStop = async () => {
    const newMessage = {
      id: nanoid(),
      text: transcript,
      isUserMessage: true,
    };

    messagesContext.addMessage(newMessage);

    SpeechRecognition.stopListening();
    setIsRecording(false);
    resetTranscript();

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

    messagesContext.addMessage({
      id: nanoid(),
      text: response.text,
      isUserMessage: false,
    });

    let utterance = new SpeechSynthesisUtterance(response.text);
    utterance.lang = "en-US";

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="">
      <div className="border-b p-8 mb-4">
        <h1 className="text-xl font-bold">Topic: {lessonTopic}</h1>
        <h2 className="text-lg">Grammar: {grammarTopic}</h2>
        {vocabulary && <p>Vocabulary: {vocabulary}</p>}
      </div>
      <div className="overflow-y-scroll h-[calc(100vh-4rem-120px-95px)] scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch py-4 px-8 flex flex-wrap gap-2">
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
