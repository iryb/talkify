"use client"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import React from 'react'

export const Chat = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const { mutate: sendMessage, isPending: isLoading } = useMutation({
        mutationFn: async (message: Message) => {
          const response = await fetch("/api/message", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ messages: [message] }),
          });
    
          if (!response.ok) {
            throw new Error();
          }
    
          return response.body;
        },
        onMutate(message) {
          addMessage(message);
        },
        onSuccess: async (stream) => {
          if (!stream) throw new Error("No stream found");
    
          const id = nanoid();
          const responseMessage: Message = {
            id,
            isUserMessage: false,
            text: "",
          };
    
          addMessage(responseMessage);
    
          setIsMessageUpdating(true);
    
          const reader = stream.getReader();
          const decoder = new TextDecoder();
          let done = false;
    
          while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            updateMessage(id, (prev) => prev + chunkValue);
          }
    
          setIsMessageUpdating(false);
          setInput("");
          setTimeout(() => textareaRef.current?.focus(), 10);
        },
        onError(_, message) {
          toast.error("Something went wrong. Please try again.");
          removeMessage(message.id);
          textareaRef.current?.focus();
        },
      });

    return (
    <div>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={() => SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
    </div>
    );
}
