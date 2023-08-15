import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Fragment } from "react";
import { nanoid } from "@reduxjs/toolkit";

type AlertDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  message: JSX.Element;
  actionButtons: JSX.Element[];
};

const AlertDialog = ({ isOpen, setIsOpen, title, message, actionButtons }: AlertDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {actionButtons.map((button) => (
            <Fragment key={nanoid()}>{button}</Fragment>
          ))}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;
