import { useAuth } from "@/context/auth";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/Button";
import { ProfileMenu } from "./ProfileMenu";

export const Header = () => {
  const { currentUser } = useAuth();

  return (
    <header className="border-b bg-slate-200 border-slate-300 h-16">
      <div className="px-4 py-4 flex justify-between">
        <div className="text-xl uppercase font-bold tracking-wider text-slate-800">
          <Link href={"/"}>Talkify</Link>
        </div>
        {currentUser && currentUser.email ? (
          <ProfileMenu username={currentUser.email} />
        ) : (
          <Button asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
        )}
      </div>
    </header>
  );
};
