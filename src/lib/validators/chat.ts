import { z } from "zod";

export const ChatSchema = z.object({
  id: z.string(),
  lessonTopic: z.string(),
  grammarTopic: z.string(),
  level: z.enum(["a1", "a2", "b1", "b2", "c1", "c2"]),
  vocabulary: z.string().optional(),
  questions: z.string().optional(),
  createdAt: z.string().optional(),
  modifiedAt: z.string().optional(),
});

export type Chat = z.infer<typeof ChatSchema>;

export const ChatFormSchema = z.object({
  level: z.enum(["a1", "a2", "b1", "b2", "c1", "c2"]),
  lessonTopic: z.string(),
  grammarTopic: z.string(),
  vocabulary: z.string().optional(),
  questions: z.string().optional(),
  assignedUsers: z.string().optional(),
});

export type ChatForm = z.infer<typeof ChatFormSchema>;
