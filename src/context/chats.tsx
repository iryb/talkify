import { getChats } from "@/firebase/chat/chat";
import { Chat, EditChatForm } from "@/lib/validators/chat";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth";
import { nanoid } from "nanoid";

type ChatsContextType = {
  chats: Chat[];
  activeChatId: string;
  isChatsListActive: boolean;
  loading: boolean;
  openChatsList: () => void;
  setActiveChat: (id: string) => void;
  addChat: (chat: Chat) => void;
  editChat: (chat: EditChatForm) => void;
  removeChat: (id: string) => void;
  removeChats: () => void;
};

export const ChatsContext = createContext<ChatsContextType>({
  chats: [],
  activeChatId: "",
  isChatsListActive: false,
  loading: true,
  openChatsList: () => {},
  setActiveChat: () => {},
  addChat: () => {},
  editChat: () => {},
  removeChat: () => {},
  removeChats: () => {},
});

export const ChatsProvider = ({ children }: { children: React.ReactNode }) => {
  const demoChat: Chat = {
    id: nanoid(),
    lessonTopic: "Weather",
    grammarTopic: "Present Simple",
    level: "a2",
    createdAt: new Date().toJSON(),
    modifiedAt: new Date().toJSON(),
    isDemoChat: true,
  };
  const [chats, setChats] = useState<Chat[]>([demoChat]);
  const [activeChatId, setActiveChatId] = useState<string>(demoChat.id);
  const [isChatsListActive, setChatsListActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      getChats({ userId: currentUser.uid })
        .then((data) => {
          setChats((prev) => [...prev, ...data]);
          setActiveChatId(data[0].id);
        })
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const addChat = (chat: Chat) => {
    setChats((prev) => [...prev, chat]);
  };

  const editChat = (chat: EditChatForm) => {
    const { id, lessonTopic, grammarTopic, level, vocabulary, questions } =
      chat;
    const updatedChat = {
      id,
      lessonTopic,
      grammarTopic,
      level,
      vocabulary,
      questions,
      createdAt: new Date().toJSON(),
      modifiedAt: new Date().toJSON(),
    };
    setChats((prev) => [
      ...prev.filter((prev) => prev.id !== chat.id),
      updatedChat,
    ]);
  };

  const removeChat = (id: string) => {
    setChats(chats.filter((item) => item.id !== id));
  };

  const setActiveChat = (id: string) => {
    setActiveChatId(id);
  };

  const openChatsList = () => {
    setChatsListActive(!isChatsListActive);
  };

  const removeChats = () => {
    setChats([demoChat]);
    setActiveChat(demoChat.id);
  };

  return (
    <ChatsContext.Provider
      value={{
        chats,
        activeChatId,
        isChatsListActive,
        loading,
        openChatsList,
        setActiveChat,
        addChat,
        editChat,
        removeChat,
        removeChats,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};

export const useChats = () => {
  return useContext(ChatsContext);
};
