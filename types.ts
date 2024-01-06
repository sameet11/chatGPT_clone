import { z } from "zod"

export const ChatCompletionSchema = z.object({
    "role": z.string(),
    "content": z.string(),
}
)

const promptOptionSchema = z.array(z.object({
    h1: z.string(),
    p: z.string()
}));

export type prompOption = z.infer<typeof promptOptionSchema>

export type ChatCompletion = z.infer<typeof ChatCompletionSchema>