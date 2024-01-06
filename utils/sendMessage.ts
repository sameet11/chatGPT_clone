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
            console.log('Server response:', responseData);
            return responseData;
        } else {
            throw new Error('Failed to fetch data from the server');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Something went wrong')
    }
};

export default sendMessage;