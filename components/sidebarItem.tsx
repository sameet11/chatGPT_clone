import { conversation } from "@/types";
import React from "react";
import { useRouter } from "next/navigation";
import useChatStore from "@/store/useChat";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/database_types";
import toast from "react-hot-toast";
interface SidebarItemProps {
  convo: conversation[] | null;
}
const SidebarItem: React.FC<SidebarItemProps> = ({ convo }) => {
  const router = useRouter();
  const { clearChat, setChat, setconversationID } = useChatStore();
  const supabase = createClientComponentClient<Database>();
  const handleConversation = async (id: string) => {
    clearChat();
    router.push("/chat");
    const { data: messageData, error: messageError } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", id);
    if (messageError) {
      toast.error("Messages Could'nt be retrieved");
      router.replace("/");
    }
    router.refresh();
    if (messageData) {
      setconversationID(messageData[0].conversation_id);
      messageData.map(({ role, content }) =>
        setChat({
          role,
          content,
        })
      );
    }
  };
  return (
    <div>
      {convo?.map((prompt) => (
        <div
          className="flex flex-col items-start overflow-y-auto overflow-hidden"
          key={prompt.id}
          onClick={() => {
            handleConversation(prompt.id);
          }}
        >
          <div
            className="h-10 text-white hover rounded-lg p-2 overflow-hidden whitespace-nowrap overflow-ellipsis w-[210px] m-3 text-sm" // Set your desired width here
          >
            <h1>{prompt.name}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};
export default SidebarItem;
