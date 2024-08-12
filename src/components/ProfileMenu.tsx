import React, { useState } from "react";
import { Avatar, AvatarFallback } from "./ui/Avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/Menubar";
import signIn, { deleteAccount, signOut } from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { useChats } from "@/context/chats";
import { useMessages } from "@/context/messages";
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
import { Input } from "./ui/Input";
import { useForm } from "react-hook-form";
import { ReauthSchema } from "@/lib/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/auth";

type ProfileMenuProps = {
  username: string;
};

export const ProfileMenu = ({ username }: ProfileMenuProps) => {
  const { removeChats } = useChats();
  const { removeAllMessages } = useMessages();
  const [isReauthOpened, setReauthOpened] = useState(false);
  const { currentUser } = useAuth();
  const [error, setError] = useState(null);

  const form = useForm<{
    password: string;
  }>({
    resolver: zodResolver(ReauthSchema),
    defaultValues: {
      password: undefined,
    },
  });

  const router = useRouter();
  const handleLogOut = () => {
    signOut().then(() => router.push("/"));
    removeChats();
    removeAllMessages();
  };

  const handleDeleteAccount = () => {
    setReauthOpened(true);

    //  deleteAccount();
  };

  const reauthAndDeleteAccount = (values: { password: string }) => {
    if (!currentUser?.email) return;

    setError(null);

    const credentials = {
      email: currentUser.email,
      password: values.password,
    };

    signIn(credentials)
      .then(() => console.log("reauth"))
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <>
      {isReauthOpened && (
        <AlertDialog open={isReauthOpened}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Do you really want to delete your account?
              </AlertDialogTitle>
              <AlertDialogDescription>
                {error && (
                  <div className="p-4 bg-red-400 text-white mb-2">{error}</div>
                )}
                <div className="pb-2">
                  Please enter your password to confirm.
                </div>
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
      )}
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <Avatar>
              <AvatarFallback>
                <span className="uppercase font-bold">
                  {username.slice(0, 2)}
                </span>
              </AvatarFallback>
            </Avatar>
          </MenubarTrigger>
          <MenubarContent>
            <div className="px-2 py-1.5 text-sm">{username}</div>
            <MenubarSeparator />
            <MenubarItem onClick={handleLogOut}>Log Out</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={handleDeleteAccount} className="text-red-500">
              Delete Account
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};
