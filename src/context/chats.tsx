import { getChats } from "@/firebase/chat/chat";
import { Chat } from "@/lib/validators/chat";
import { createContext, useContext, useEffect, useState } from "react";

type ChatsContextType = {
  chats: Chat[];
  activeChatId: string;
  setActiveChat: (id: string) => void;
  addChat: (chat: Chat) => void;
  removeChat: (id: string) => void;
};

export const ChatsContext = createContext<ChatsContextType>({
  chats: [],
  activeChatId: "",
  setActiveChat: () => {},
  addChat: () => {},
  removeChat: () => {},
});

export const ChatsProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string>("");

  useEffect(() => {
    getChats().then((data) => {
      setChats(data);
      setActiveChatId(data[0].id);
    });
  }, []);

  const addChat = (chat: Chat) => {
    setChats((prev) => [...prev, chat]);
  };

  const removeChat = (id: string) => {
    setChats(chats.filter((item) => item.id !== id));
  };

  const setActiveChat = (id: string) => {
    setActiveChatId(id);
  };

  return (
    <ChatsContext.Provider
      value={{ chats, activeChatId, setActiveChat, addChat, removeChat }}
    >
      {children}
    </ChatsContext.Provider>
  );
};

export const useChats = () => {
  return useContext(ChatsContext);
};
