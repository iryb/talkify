"use client";
import React from "react";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { signIn as SignInProps, SignInSchema } from "@/lib/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/Input";
import signIn from "@/firebase/auth/signin";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const SignIn = () => {
  const router = useRouter();
  const form = useForm<SignInProps>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  });

  function onSubmit(values: SignInProps) {
    signIn(values).then(() => router.push("/"));
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-xl mb-4 font-bold">Sign In</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Sign In</Button>
        </form>
      </Form>
      <div className="mt-6 pt-2 border-t">
        Don&apos;t have an account?{" "}
        <Button variant="link" asChild className="font-bold">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
};
