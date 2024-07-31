import React from "react";
import { Avatar, AvatarFallback } from "./ui/Avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/Menubar";
import { signOut } from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { useChats } from "@/context/chats";
import { useMessages } from "@/context/messages";

type ProfileMenuProps = {
  username: string;
};

export const ProfileMenu = ({ username }: ProfileMenuProps) => {
  const { removeChats } = useChats();
  const { removeAllMessages } = useMessages();

  const router = useRouter();
  const handleLogOut = () => {
    signOut().then(() => router.push("/"));
    removeChats();
    removeAllMessages();
  };

  return (
    <>
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
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};
