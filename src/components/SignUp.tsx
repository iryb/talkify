"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { signUp as SignUpProps, SignUpSchema } from "@/lib/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/Input";
import signUp from "@/firebase/auth/signup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PasswordInput } from "./ui/PasswordInput";
import Image from "next/image";
import { signInGoogle } from "@/firebase/auth/signin";

export const SignUp = () => {
  const [error, setError] = useState(null);
  const router = useRouter();
  const form = useForm<SignUpProps>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  });

  function onSubmit(values: SignUpProps) {
    setError(null);
    signUp(values)
      .then(() => router.push("/"))
      .catch((e) => setError(e.message));
  }

  const handleGoogleSignup = () => {
    signInGoogle()
      .then(() => router.push("/"))
      .catch((e) => setError(e.message));
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-xl mb-4 font-bold">Sign Up</h1>
      {error && <div className="bg-red-400 p-4 mb-2">{error}</div>}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-md"
        >
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
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Sign Up</Button>
        </form>
      </Form>
      <Button
        className="mt-4 border-slate-800"
        variant={"outline"}
        onClick={handleGoogleSignup}
      >
        Sign Up with
        <Image
          className="ml-2"
          src={`/google.svg`}
          alt="Google"
          width="32"
          height="32"
        />
      </Button>
      <div className="mt-6 pt-2 border-t">
        Already have an account?{" "}
        <Button variant="link" asChild className="font-bold">
          <Link href="/signin">Sign In</Link>
        </Button>
      </div>
    </div>
  );
};
