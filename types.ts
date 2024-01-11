import { z } from "zod";
import type { Database } from "@/database_types";

export const ChatCompletionSchema = z.object({
    "role": z.string(),
    "content": z.string(),
}
)

const promptOptionSchema = z.array(z.object({
    h1: z.string(),
    p: z.string()
}));

export const emailSchema = z.string().email();

export type email = z.infer<typeof emailSchema>;

export type prompOption = z.infer<typeof promptOptionSchema>

export type ChatCompletion = z.infer<typeof ChatCompletionSchema>

export type conversation = Database['public']['Tables']['conversation']['Row'];