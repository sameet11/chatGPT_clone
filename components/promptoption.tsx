"use client";
import React, { useState, useEffect } from "react";
import { type prompOption } from "@/types";
import sendMessage from "@/utils/sendMessage";
import { useRouter } from "next/navigation";
import useChatStore from "@/store/useChat";

interface promptOptionProps {
  arr: prompOption;
}

const PromptOption: React.FC<promptOptionProps> = ({ arr }) => {
  const [visibleOptions, setVisibleOptions] = useState(2); // Set the number of visible options
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const router = useRouter();
  const { chat, setChat } = useChatStore();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640); // Set the breakpoint for small screens
    };

    handleResize(); // Check screen size on initial render

    window.addEventListener("resize", handleResize); // Event listener for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener on component unmount
    };
  }, []);
  const handleClick = async (h1: string, p: string) => {
    const prompt = h1 + " " + p;
    try {
      const newChat = {
        role: "user",
        content: prompt,
      };
      router.push("/chat");
      const response = await sendMessage(newChat, chat);
      setChat(newChat);
      setChat(response);
      console.log(chat);
    } catch (error) {
      throw new Error("something wnet wrong");
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
            className="border rounded-lg m-2 p-1 hover text-start"
          >
            <h1 className="text-gray-300 font-semibold text-sm">{ele.h1}</h1>
            <p className="text-gray-500 text-sm">{ele.p}</p>
          </button>
        ))}
    </>
  );
};

export default PromptOption;
