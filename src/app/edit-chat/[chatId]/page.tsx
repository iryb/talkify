import { EditChat } from "@/components/EditChat";
import { getChatById } from "@/firebase/chat/chat";

interface PageProps {
  params: {
    chatId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { chatId } = params;

  const chat = await getChatById({ id: chatId });

  if (!chat) {
    return <p>Chat not found</p>;
  }

  const { lessonTopic, grammarTopic, level, vocabulary } = chat;

  return (
    <EditChat
      id={chatId}
      lessonTopic={lessonTopic}
      grammarTopic={grammarTopic}
      level={level}
      vocabulary={vocabulary}
    />
  );
};

export default Page;
