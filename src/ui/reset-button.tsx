import { cn } from "@/utils/cn";
import { useActions, useChanges, useGameCompleted } from "@/state/store";
import React, { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle } from "@/ui/alert-dialog";
import { DialogHeader } from "@/ui/dialog";

export default function ResetButton() {
  const { reset } = useActions();
  const [showDialog, setShowDialog] = useState(false);
  const userActions = useChanges();
  const gameCompleted = useGameCompleted();
  const disabled = userActions.length === 0 || gameCompleted;

  return (
    <>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <DialogHeader>
            <AlertDialogTitle className='text-center'>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className='text-center'>This will reset your entire game</AlertDialogDescription>
          </DialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={reset}>Reset game</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <button
        onClick={() => setShowDialog(true)}
        disabled={disabled}
        className={cn("flex items-center justify-center gap-2 rounded-lg bg-slate-200 px-3 py-1.5 font-bold", disabled && "opacity-30")}
      >
        Reset
      </button>
    </>
  );
}
