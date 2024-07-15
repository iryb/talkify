import { getChats } from "@/firebase/chat/chat";
import { Chat } from "@/lib/validators/chat";
import { createContext, useContext, useEffect, useState } from "react";

type ChatsContextType = {
  chats: Chat[];
  addChat: (chat: Chat) => void;
  removeChat: (id: string) => void;
};

export const ChatsContext = createContext<ChatsContextType>({
  chats: [],
  addChat: () => {},
  removeChat: () => {},
});

export const ChatsProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    getChats().then((data) => setChats(data));
  }, []);

  const addChat = (chat: Chat) => {
    setChats((prev) => [...prev, chat]);
  };

  const removeChat = (id: string) => {
    setChats(chats.filter((item) => item.id !== id));
  };

  return (
    <ChatsContext.Provider value={{ chats, addChat, removeChat }}>
      {children}
    </ChatsContext.Provider>
  );
};

export const useChats = () => {
  return useContext(ChatsContext);
};
