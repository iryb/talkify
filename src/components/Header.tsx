import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header className="border-b bg-slate-200 border-slate-300 h-16">
      <div className="px-4 py-4">
        <div className="text-xl uppercase font-bold tracking-wider text-slate-800">
          <Link href={"/"}>Talkify</Link>
        </div>
      </div>
    </header>
  );
};
