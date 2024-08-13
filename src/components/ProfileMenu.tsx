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
import { signOut } from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { useChats } from "@/context/chats";
import { useMessages } from "@/context/messages";
import { DeleteAccoutDialog } from "./DeleteAccoutDialog";

type ProfileMenuProps = {
  username: string;
};

export const ProfileMenu = ({ username }: ProfileMenuProps) => {
  const { removeChats } = useChats();
  const { removeAllMessages } = useMessages();
  const [isReauthOpened, setReauthOpened] = useState(false);

  const router = useRouter();
  const handleLogOut = () => {
    signOut().then(() => router.push("/"));
    removeChats();
    removeAllMessages();
  };

  return (
    <>
      <DeleteAccoutDialog isOpened={isReauthOpened} />
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
            <MenubarItem onClick={handleLogOut} className="cursor-pointer">
              Log Out
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem
              onClick={() => setReauthOpened(true)}
              className="text-red-500 cursor-pointer"
            >
              Delete Account
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};
