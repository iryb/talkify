import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  deleteDoc,
  doc,
  query,
  where,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../config";
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
      assignedUsers: arrayUnion(auth.currentUser?.uid),
      createdAt: new Date().toJSON(),
      modifiedAt: new Date().toJSON(),
    });

    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getChatById = async ({
  id,
}: {
  id: string;
}): Promise<Chat | undefined> => {
  const docRef = doc(db, "chat", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return;

  const chat: Chat = {
    id: docSnap.id,
    lessonTopic: docSnap.data().lessonTopic,
    grammarTopic: docSnap.data().grammarTopic,
    level: docSnap.data().level,
    vocabulary: docSnap.data().vocabulary,
    questions: docSnap.data().questions,
    createdAt: docSnap.data().createdAt,
    modifiedAt: docSnap.data().modifiedAt,
  };

  return chat;
};

export const getChats = async ({
  userId,
}: {
  userId: string;
}): Promise<Chat[]> => {
  if (!userId) return [];

  const q = query(
    collection(db, "chat"),
    where("assignedUsers", "array-contains", userId)
  );

  const querySnapshot = await getDocs(q);

  const data = await Promise.all(
    await querySnapshot.docs.map(async (doc) => {
      const chat: Chat = {
        id: doc.id,
        lessonTopic: doc.data().lessonTopic,
        grammarTopic: doc.data().grammarTopic,
        level: doc.data().level,
        vocabulary: doc.data().vocabulary,
        questions: doc.data().questions,
        createdAt: doc.data().createdAt,
        modifiedAt: doc.data().modifiedAt,
      };

      return chat;
    })
  );

  return data;
};

export const deleteChat = async (id: string) => {
  try {
    await deleteDoc(doc(db, "chat", id));
    return id;
  } catch (error) {
    throw error;
  }
};
