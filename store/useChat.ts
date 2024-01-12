import { ChatCompletion } from '@/types'
import { create } from 'zustand'

type State = {
    chat: ChatCompletion[],
    isLoading: boolean,
    Toggle: boolean,
    conversationID: string,
    responseError: boolean,


}

type Actions = {
    setChat: (c: ChatCompletion) => void,
    setIsLoading: (val: boolean) => void,
    setToggle: (val: boolean) => void,
    clearChat: () => void,
    setconversationID: (convoID: string) => void,
    setResponseError: (val: boolean) => void,
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
    responseError: false,
    setChat: (c: ChatCompletion) => set((state) => ({ chat: [...state.chat, c] })),
    setIsLoading: (val: boolean) => set(() => ({ isLoading: val })),
    setToggle: (val: boolean) => set((state) => ({ Toggle: val })),
    clearChat: () => set(() => ({
        chat: [
            {
                role: "user",
                content: "you are an AI Assistant.",
            },
        ]
    })),
    setconversationID: (convoID: string) => set(() => ({ conversationID: convoID })),
    setResponseError: (val: boolean) => set(() => ({ responseError: val }))
}))

export default useChatStore;