"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Chat,
  ChatForm,
  ChatFormSchema,
  EditChatForm,
} from "@/lib/validators/chat";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { editChat } from "@/firebase/chat/chat";
import { useChats } from "@/context/chats";

export const EditChat = ({
  id,
  lessonTopic,
  grammarTopic,
  level,
  vocabulary,
}: EditChatForm) => {
  const { editChat: editChatContext } = useChats();
  const form = useForm<ChatForm>({
    resolver: zodResolver(ChatFormSchema),
    defaultValues: {
      lessonTopic: lessonTopic,
      grammarTopic: grammarTopic,
      level: level,
      questions: "",
      vocabulary: vocabulary,
    },
  });

  const onSubmit = async (values: ChatForm) => {
    editChat({ id, ...values });
    editChatContext({
      id: id,
      ...values,
    });
  };

  return (
    <div className="p-4 md:p-8 overflow-y-scroll h-full">
      <h1 className="text-xl mb-4 font-bold">Edit Chat</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="lessonTopic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lesson topic</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>English Level</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a1">A1</SelectItem>
                      <SelectItem value="a2">A2</SelectItem>
                      <SelectItem value="b1">B1</SelectItem>
                      <SelectItem value="b2">B2</SelectItem>
                      <SelectItem value="c1">C1</SelectItem>
                      <SelectItem value="c2">C2</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grammarTopic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grammar topic</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vocabulary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vocabulary</FormLabel>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="questions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Questions</FormLabel>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
};
