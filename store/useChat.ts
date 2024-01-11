import { ChatCompletion } from '@/types'
import { create } from 'zustand'

type State = {
    chat: ChatCompletion[],
    isLoading: boolean,
    Toggle: boolean,
    conversationID: string,

}

type Actions = {
    setChat: (c: ChatCompletion) => void,
    setIsLoading: (val: boolean) => void,
    setToggle: () => void,
    clearChat: () => void,
    setconversationID: (convoID: string) => void,
}

const useChatStore = create<State & Actions>((set) => ({
    chat: [
        {
            role: "user",
            content: "you are an AI Assistant.",
        },
    ],
    isLoading: false,
    Toggle: false,
    conversationID: "",
    setChat: (c: ChatCompletion) => set((state) => ({ chat: [...state.chat, c] })),
    setIsLoading: (val: boolean) => set(() => ({ isLoading: val })),
    setToggle: () => set((state) => ({ Toggle: !state.Toggle })),
    clearChat: () => set(() => ({
        chat: [
            {
                role: "user",
                content: "you are an AI Assistant.",
            },
        ]
    })),
    setconversationID: (convoID: string) => set(() => ({ conversationID: convoID }))
}))

export default useChatStore;