import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/AlertDialog";

type ConfirmDialogProps = {
  confirmCallback: () => void;
  text: string;
  children?: React.ReactNode;
  className?: string;
  triggerTitle?: string;
};

export const ConfirmDialog = ({
  children,
  text,
  className,
  triggerTitle,
  confirmCallback,
}: ConfirmDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{text}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmCallback}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>

      <AlertDialogTrigger className={className} title={triggerTitle}>
        {children}
      </AlertDialogTrigger>
    </AlertDialog>
  );
};
