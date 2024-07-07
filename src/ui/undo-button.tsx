import { UndoIcon } from '@/ui/icons';
import { cn } from '@/utils/cn';
import QwixxStore, { ActionType } from "@/state/store";


export default function UndoButton() {
  const undo = QwixxStore.use.undo();
  const userActions = QwixxStore.use.changes();

  const disabled = userActions.length === 0 || userActions.at(-1)?.actionType === ActionType.pusher;

  return (
    <button
      data-testid="undo"
      onClick={undo}
      disabled={disabled}
      className={cn('p-1.5 rounded-lg flex items-center justify-center bg-slate-200 ml-auto', disabled && 'opacity-30')}>
      <UndoIcon/>
    </button>
  );
}
