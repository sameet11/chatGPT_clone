"use client";
import React, { useState, ChangeEvent } from "react";
import { FaArrowUp } from "react-icons/fa";
import sendMessage from "@/utils/sendMessage";
import { useRouter } from "next/navigation";
import useChatStore from "@/store/useChat";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import type { Database } from "@/database_types";

const Prompt = () => {
  const [prompt, setPrompt] = useState<string>("");
  const router = useRouter();
  const {
    chat,
    setChat,
    setIsLoading,
    conversationID,
    setconversationID,
    setResponseError, // Corrected setConversationID function name
  } = useChatStore();

  const supabase = createClientComponentClient<Database>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newChat = {
        role: "user",
        content: prompt,
      };
      setPrompt("");
      setChat(newChat);
      setIsLoading(false);
      router.push("/chat");
      setResponseError(false);
      const responseData = await sendMessage(newChat, chat);
      const { message, data, error } = responseData;
      let convoID: string = "";
      if (data) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data: convoData, error: convoError } = await supabase
            .from("conversation")
            .insert({
              name: data,
              user_id: user.id,
            })
            .select();
          if (convoError) {
            toast.error("conversation could not be saved");
            console.log(convoError);
          }
          router.refresh();
          if (convoData) convoID = convoData[convoData.length - 1].id;
          setconversationID(convoID); // Corrected condition for setting conversationID
        }
      }

      if (convoID === "") {
        convoID = conversationID;
      }

      // Insert user message into 'messages' table
      const { error: userError } = await supabase.from("messages").insert({
        role: newChat.role,
        content: newChat.content,
        conversation_id: convoID,
      });

      if (userError) {
        toast.error("User message could not be saved");
      }
      router.refresh();

      // Insert system message into 'messages' table
      const { error: systemError } = await supabase.from("messages").insert({
        role: message.role,
        content: message.content,
        conversation_id: convoID,
      });

      if (systemError) {
        toast.error("System message could not be saved");
      }
      router.refresh();
      setIsLoading(true);
      setChat(message);
    } catch (error) {
      setIsLoading(true);
      setResponseError(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full flex items-center justify-end"
    >
      <input
        type="text"
        placeholder="Message ChatGPT..."
        value={prompt}
        onChange={handleChange}
        className="w-full h-12 px-4 rounded-xl border-p outline-none main-chat overflow-y-auto max-h-20 pr-12"
      />
      <button
        type="submit"
        className="absolute text-white rounded-lg px-4 py-2 right-1 top-1 h-10 flex items-center justify-center bg-white hover:bg-gray-500"
      >
        <FaArrowUp className="text-black" />
      </button>
    </form>
  );
};

export default Prompt;
