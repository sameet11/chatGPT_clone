import { type ChatCompletion } from "@/types";

const sendMessage = async (newChat: ChatCompletion, chat: ChatCompletion[]) => {
    const updatedChat = [...chat, newChat];
    try {
        const response = await fetch('/api/chatGPT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ updatedChat }),
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            throw new Error("server error")
        }
    } catch (error) {
        throw new Error("something went wrong");
    }
};

export default sendMessage;