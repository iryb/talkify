import { Message } from '@/lib/validators/message';
import { createContext, useState } from 'react';

type MessagesContextType = {
    messages: Message[],
    addMessage: (message: Message) => void,
    removeMessage: (id: string) => void
}

export const MessagesContext = createContext<MessagesContextType>({
    messages: [],
    addMessage: () => {},
    removeMessage: () => {}
});

export const MessagesProvider = ({children}: {children: React.ReactNode}) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "123",
            text: "Hello. How are you?",
            isUserMessage: false
        }
    ]);

    const addMessage = (message: Message) => {
        setMessages((prev) => [...prev, message]);
    }

    const removeMessage = (id: string) => {
        setMessages(messages.filter(item => item.id !== id));
    }

    return (
        <MessagesContext.Provider value={{messages, addMessage, removeMessage}}>
            {children}
        </MessagesContext.Provider>
    )
}