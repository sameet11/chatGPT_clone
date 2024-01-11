"use client";
import React, { useEffect, useRef } from "react";
import useChatStore from "@/store/useChat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from "react-markdown";

export default function Chat() {
  const { chat, isLoading, responseError } = useChatStore();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chat]);
  return (
    <div className="h-5/6 overflow-y-auto" ref={containerRef}>
      <div className="lg:mx-52 xl:mx-64 mt-5">
        {chat.length === 0 ? (
          <div>Loading...</div>
        ) : (
          chat.map((chats, index) => {
            if (index === 0) {
              return null;
            }
            return (
              <div key={index} className="flex flex-col mb-14">
                <div className="flex">
                  <div>
                    {chats.role === "user" ? (
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    ) : (
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/Chatgpt-green.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <div className="ml-4 font-extrabold">
                    {chats.role === "user" ? "YOU" : "ChatGPT"}
                  </div>
                </div>
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code
                        className=" font-semibold bg-black/20 rounded-lg p-1"
                        {...props}
                      />
                    ),
                  }}
                  className="ml-10 mt-2 font-medium text-sm overflow-hidden leading-7"
                >
                  {chats.content || ""}
                </ReactMarkdown>
              </div>
            );
          })
        )}
        {!isLoading && (
          <div className="flex items-center space-x-4 mb-14">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        )}
        {responseError && (
          <div className="bg-red-500 text-white p-4 rounded-md">
            <p className="font-bold">Error:</p>
            <p>Plz try again.Server Error!</p>
          </div>
        )}
      </div>
    </div>
  );
}
