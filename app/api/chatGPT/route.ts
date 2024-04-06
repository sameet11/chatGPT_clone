import OpenAI from "openai";
import { NextResponse } from "next/server";
import { ChatCompletion, ChatCompletionSchema } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/database_types";
import { cookies } from 'next/headers'
const openai = new OpenAI();
export async function POST(req: Request) {
    try {
        const cookieStore = cookies();
        const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            return NextResponse.json({ msg: "user not authenticated" }, { status: 404 });
        }
        const body = await req.json()
        const { updatedChat } = body;
        const parsechat = ChatCompletionSchema.array().safeParse(updatedChat);
        if (!parsechat.success) {
            return NextResponse.json({ msg: "INVALID INPUT" }, { status: 404 });
        }
        let data: string | null = null;
        if (updatedChat.length === 2) {
            const newChat: ChatCompletion[] = [{
                role: "user",
                content: "suggest a three word heading of the above prompt"
            }]
            const completion = await openai.chat.completions.create({
                messages: [...updatedChat, ...newChat],
                model: "gpt-4",
            });
            data = completion.choices[0].message.content;
            if (data) {
                data = data.replace(/"/g, '');
            }
        }

        const completion = await openai.chat.completions.create({
            messages: updatedChat,
            model: "gpt-4",
        });
        const responseData = {
            message: completion.choices[0].message,
            data: data // Include convoname in the response
        };
        return NextResponse.json(responseData, { status: 200 })
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: "Somethin went Wrong" }, { status: 500 })
    }
}
