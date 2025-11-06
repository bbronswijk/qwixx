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
      className={cn("ml-auto flex items-center justify-center gap-2 rounded-lg bg-slate-200 px-3 py-1.5 font-bold", disabled && "opacity-30")}
    >
      <UndoIcon className='h-5 w-5' />
      Undo
    </button>
  );
}
