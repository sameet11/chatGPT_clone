"use client";
import React, { useState, ChangeEvent } from "react";
import { FaArrowUp } from "react-icons/fa";
import sendMessage from "@/utils/sendMessage";
import { useRouter } from "next/navigation";
import useChatStore from "@/store/useChat";
const Prompt = () => {
  const [prompt, setPrompt] = useState<string>("");
  const router = useRouter();
  const { chat, setChat, setIsLoading } = useChatStore();
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
      const responseData = await sendMessage(newChat, chat);
      setIsLoading(true);
      setChat(responseData);
    } catch (error) {
      console.log("error");
      throw new Error("Message could'nt be sent");
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
        className="w-full h-12 px-4 rounded-lg border outline-none main-chat overflow-y-auto max-h-20 pr-12"
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
