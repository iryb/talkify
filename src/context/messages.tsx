import { Message } from "@/lib/validators/message";
import { nanoid } from "nanoid";
import { createContext, useContext, useState } from "react";

type MessagesContextType = {
  messages: Message[];
  addMessage: (message: Message) => void;
  removeMessage: (id: string) => void;
  removeAllMessages: () => void;
};

export const MessagesContext = createContext<MessagesContextType>({
  messages: [],
  addMessage: () => {},
  removeMessage: () => {},
  removeAllMessages: () => {},
});

export const MessagesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const defaultMessage = {
    id: nanoid(),
    text: "Hello. How are you?",
    isUserMessage: false,
  };
  const [messages, setMessages] = useState<Message[]>([defaultMessage]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const removeMessage = (id: string) => {
    setMessages(messages.filter((item) => item.id !== id));
  };

  const removeAllMessages = () => {
    setMessages([defaultMessage]);
  };

  return (
    <MessagesContext.Provider
      value={{ messages, addMessage, removeMessage, removeAllMessages }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  return useContext(MessagesContext);
};
