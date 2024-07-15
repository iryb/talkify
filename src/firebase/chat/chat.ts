import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../config";
import { Chat, ChatForm } from "@/lib/validators/chat";

export const addChat = async ({
  lessonTopic,
  grammarTopic,
  level,
  questions,
  vocabulary,
}: ChatForm): Promise<any> => {
  try {
    const docRef = await addDoc(collection(db, "chat"), {
      lessonTopic,
      grammarTopic,
      level,
      questions,
      vocabulary,
    });

    return docRef;
  } catch (error) {
    throw error;
  }
};

export const getChats = async (): Promise<Chat[]> => {
  const querySnapshot = await getDocs(collection(db, "chat"));

  const data = await Promise.all(
    await querySnapshot.docs.map(async (doc) => {
      const chat: Chat = {
        id: doc.id,
        lessonTopic: doc.data().lessonTopic,
        grammarTopic: doc.data().grammarTopic,
        level: doc.data().level,
        vocabulary: doc.data().vocabulary,
        questions: doc.data().questions,
      };

      return chat;
    })
  );

  return data;
};
