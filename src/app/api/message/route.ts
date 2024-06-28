//@ts-nocheck
import {
  ChatGPTMessage,
} from "@/lib/openai-stream";
import { MessageArraySchema } from "@/lib/validators/message";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  const { messages, langLevel } = await req.json();

  const parsedMessages = MessageArraySchema.parse(messages);

  const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => ({
    role: message.isUserMessage ? "user" : "system",
    content: message.text,
  }));

  outboundMessages.unshift({
    role: "system",
    content: `You are English speaking partner. Start an engaging conversation. Use ${langLevel} language level in conversation.`,
  });

  const payload = {
    model: "gpt-3.5-turbo",
    messages: outboundMessages,
    stream: false,
  };

  const response = await openai.chat.completions.create(payload);

  return NextResponse.json({
    text: response.choices[0].message.content
  });
}
