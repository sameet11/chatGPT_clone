"use client";
import React, { useState, useEffect } from "react";
import { type prompOption } from "@/types";
import sendMessage from "@/utils/sendMessage";
import { useRouter } from "next/navigation";
import useChatStore from "@/store/useChat";
import type { Database } from "@/database_types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";

interface promptOptionProps {
  arr: prompOption;
}

const PromptOption: React.FC<promptOptionProps> = ({ arr }) => {
  const [visibleOptions, setVisibleOptions] = useState(2); // Set the number of visible options
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const router = useRouter();
  const {
    chat,
    setChat,
    setIsLoading,
    clearChat,
    conversationID,
    setconversationID,
    setResponseError,
  } = useChatStore();
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1000); // Set the breakpoint for small screens
    };

    handleResize(); // Check screen size on initial render

    window.addEventListener("resize", handleResize); // Event listener for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener on component unmount
    };
  }, []);
  const handleClick = async (h1: string, p: string) => {
    clearChat();
    const prompt = h1 + " " + p;
    try {
      const newChat = {
        role: "user",
        content: prompt,
      };
      setChat(newChat);
      setIsLoading(false);
      router.push("/chat");
      setResponseError(false);
      const responseData = await sendMessage(newChat, chat);
      const { message, data } = responseData;
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
    <>
      {arr
        .slice(0, isSmallScreen ? visibleOptions : arr.length)
        .map((ele, index) => (
          <button
            onClick={() => handleClick(ele.h1, ele.p)}
            key={index}
            className="border-p rounded-xl m-2 p-1 hover text-start"
          >
            <h1 className="text-gray-300 font-semibold text-sm">{ele.h1}</h1>
            <p className="text-gray-500 text-sm">{ele.p}</p>
          </button>
        ))}
    </>
  );
};

export default PromptOption;
