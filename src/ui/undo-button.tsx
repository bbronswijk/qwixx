import { UndoIcon } from "@/ui/icons";
import { cn } from "@/utils/cn";
import { useActions, useChanges, useGameCompleted } from "@/state/store";

export default function UndoButton() {
  const { undo } = useActions();
  const userActions = useChanges();
  const gameCompleted = useGameCompleted();
  const disabled = userActions.length === 0 || gameCompleted;

  return (
    <button
      data-testid='undo'
      onClick={undo}
      disabled={disabled}
      className={cn("ml-auto flex items-center justify-center rounded-lg bg-slate-200 p-1.5", disabled && "opacity-30")}
    >
      <UndoIcon />
    </button>
  );
}
