import { ChatCompletion } from '@/types'
import { create } from 'zustand'

type State = {
    chat: ChatCompletion[],
    isLoading: boolean
}

type Actions = {
    setChat: (c: ChatCompletion) => void,
    setIsLoading: (val: boolean) => void
}

const useChatStore = create<State & Actions>((set) => ({
    chat: [
        {
            role: "user",
            content: "you are an AI Assistant.",
        },
    ],
    isLoading: false,
    setChat: (c: ChatCompletion) => set((state) => ({ chat: [...state.chat, c] })),
    setIsLoading: (val: boolean) => set((state) => ({ isLoading: val })),
}))

export default useChatStore;