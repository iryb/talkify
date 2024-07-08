import { z } from "zod";

export const ChatSchema = z.object({
  id: z.string(),
  lessonTopic: z.string(),
  grammarTopic: z.string(),
  vocabulary: z.string(),
  questions: z.string().optional(),
});

export type Chat = z.infer<typeof ChatSchema>;
