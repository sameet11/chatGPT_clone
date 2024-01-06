import OpenAI from "openai";
import { NextResponse } from "next/server";
import { ChatCompletionSchema } from "@/types";
const openai = new OpenAI();
export async function POST(req: Request) {

    try {
        const body = await req.json()
        const { updatedChat } = body;
        const parsechat = ChatCompletionSchema.array().safeParse(updatedChat);
        if (!parsechat.success) {
            return NextResponse.json({ msg: "INVALID INPUT" }, { status: 404 });
        }
        const completion = await openai.chat.completions.create({
            messages: updatedChat,
            model: "gpt-3.5-turbo-1106",
        });
        console.log(completion.choices[0].message)
        return NextResponse.json(completion.choices[0].message, { status: 200 })
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: "Somethin went Wrong" }, { status: 500 })
    }
}
