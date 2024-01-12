"use client";
import { twMerge } from "tailwind-merge";
import useChatStore from "@/store/useChat";
const Disclaimer = () => {
  const { Toggle } = useChatStore();
  return (
    <p
      className={twMerge(
        `text-center text-xs text-gray-400`,
        Toggle && "hidden"
      )}
    >
      ChatGPT can make mistakes. Consider checking important information.
    </p>
  );
};
export default Disclaimer;
