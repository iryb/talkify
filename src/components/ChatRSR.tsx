import React, { useContext, useState, useRef } from "react";
import { Chat as ChatProps } from "@/lib/validators/chat";
import { useMessages } from "@/context/messages";
import { Message } from "./Message";
import { RecordingButton } from "./ui/RecordingButton";
import { nanoid } from "nanoid";
import { Button } from "./ui/Button";

export const ChatRSR = ({ id, level, lessonTopic, grammarTopic, vocabulary, questions }: ChatProps) => {
  const { messages, addMessage } = useMessages();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // 🎤 Start Recording
  const handleStart = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        await transcribeAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  // 🛑 Stop Recording
  const handleStop = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // 🎙️ Send Audio to Lemonfox API
  const transcribeAudio = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");
    formData.append("language", "english");

    try {
      const response = await fetch("https://api.lemonfox.ai/v1/audio/transcriptions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_LEMONFOX_API_KEY}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Lemonfox Response:", data);

      if (!response.ok) {
        throw new Error(`API Error: ${data.message || "Unknown error"}`);
      }

      setTranscript(data.text || "");
      sendMessage(data.text);
    } catch (error) {
      console.error("Error transcribing audio:", error);
    }
  };

  // 📨 Send Message
  const sendMessage = async (text: string, getFeedback = false) => {
    const newMessage = {
      id: nanoid(),
      text: getFeedback ? "Get Feedback" : text,
      isUserMessage: true,
    };
    addMessage(newMessage);

    setTranscript("");

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
  };

  // 🗣️ Speak Response
  const speak = (text: string) => {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // ⏹️ Finish Chat
  const handleFinishChat = async () => {
    await sendMessage(transcript, true);
  };

  return (
    <div className="">
      <div className="border-b p-4">
        <h1 className="text-xl font-bold">Topic: {lessonTopic}</h1>
        <h2 className="">Grammar: {grammarTopic}</h2>
        {vocabulary && <p className="text-sm italic">Vocabulary: {vocabulary}</p>}
      </div>

      <div className="overflow-y-scroll h-[calc(100vh-8rem-105px)] scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch py-4 px-4 md:px-8 flex flex-col gap-2">
        {messages.map(({ isUserMessage, text }, index) => (
          <Message key={index} isUserMessage={isUserMessage} text={text} />
        ))}
      </div>

      <div className="fixed bottom-0 w-full h-16 md:left-1/4 md:w-3/4 flex justify-center gap-4 p-3 border-t bg-white">
        <RecordingButton startRecordingCallback={handleStart} stopRecordingCallback={handleStop} isActive={isRecording} />
        <Button onClick={handleFinishChat} disabled={!(messages.length > 2)}>
          Get Feedback
        </Button>
      </div>
    </div>
  );
};
