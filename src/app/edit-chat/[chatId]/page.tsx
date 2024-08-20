import { EditChat } from "@/components/EditChat";

interface PageProps {
  params: {
    chatId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { chatId } = params;

  return <EditChat id={chatId} />;
};

export default Page;
