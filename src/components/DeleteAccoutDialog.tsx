import { useAuth } from "@/context/auth";
import signIn, { deleteAccount } from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/AlertDialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReauthSchema } from "@/lib/validators/auth";
import { Input } from "./ui/Input";

export const DeleteAccoutDialog = ({ isOpened }: { isOpened: boolean }) => {
  const { currentUser } = useAuth();
  const [error, setError] = useState(null);
  const [isReauthOpened, setReauthOpened] = useState(isOpened);
  const router = useRouter();

  const form = useForm<{
    password: string;
  }>({
    resolver: zodResolver(ReauthSchema),
    defaultValues: {
      password: undefined,
    },
  });

  const reauthAndDeleteAccount = (values: { password: string }) => {
    if (!currentUser?.email) return;

    setError(null);

    const credentials = {
      email: currentUser.email,
      password: values.password,
    };

    signIn(credentials)
      .then(() => deleteAccount())
      .then(() => router.push("/"))
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <AlertDialog open={isOpened}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Do you really want to delete your account?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {error && (
              <div className="p-4 bg-red-400 text-white mb-2">{error}</div>
            )}
            <div className="pb-2">Please enter your password to confirm.</div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(reauthAndDeleteAccount)}
                className="space-y-8"
                id="reauth-form"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setReauthOpened(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction type="submit" form="reauth-form">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
