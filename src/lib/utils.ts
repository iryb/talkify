import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Chat } from "./validators/chat";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortChatsByDate(data: Chat[]) {
  return data.sort(
    (a, b) =>
      new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime()
  );
}
