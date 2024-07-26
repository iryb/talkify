import { useAuth } from "@/context/auth";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/Button";
import { ProfileMenu } from "./ProfileMenu";
import { Menu, X } from "lucide-react";
import { useChats } from "@/context/chats";

export const Header = () => {
  const { currentUser } = useAuth();
  const { isChatsListActive, openChatsList } = useChats();

  return (
    <header className="border-b bg-slate-200 border-slate-300 h-16">
      <div className="px-4 py-4 flex justify-between items-center">
        <div className="text-xl uppercase font-bold tracking-wider text-slate-800">
          <Link href={"/"}>Talkify</Link>
        </div>
        <div className="flex gap-2 items-center">
          <Button
            variant="link"
            className="flex order-2 align-center p-0"
            onClick={() => openChatsList()}
          >
            {isChatsListActive ? <X /> : <Menu />}
          </Button>
          {currentUser && currentUser.email ? (
            <ProfileMenu username={currentUser.email} />
          ) : (
            <Button asChild>
              <Link href="/signin">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
