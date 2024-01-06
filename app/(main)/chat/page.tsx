"use client";
import React from "react";
import useChatStore from "@/store/useChat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default function Chat() {
  const { chat, isLoading } = useChatStore();

  return (
    <div className="h-5/6 overflow-x-auto">
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
                <div className="ml-10 mt-3 font-semibold">{chats.content}</div>
              </div>
            );
          })
        )}
        {!isLoading && (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
