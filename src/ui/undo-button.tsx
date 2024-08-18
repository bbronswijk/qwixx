import { UndoIcon } from '@/ui/icons';
import { cn } from '@/utils/cn';
import QwixxStore, { ActionType } from "@/state/store";
import { useToast } from "@/ui/use-toast";


export default function UndoButton() {
  const undo = QwixxStore.use.undo();
  const userActions = QwixxStore.use.changes();
  const gameCompleted = QwixxStore.use.gameCompleted();
  const disabled = userActions.length === 0 || gameCompleted;
  const {toast} = useToast();

  const handleOnClick = () => {
    if (userActions.at(-1)?.actionType === ActionType.pusher) {
      toast({
        title: "The last action cannot be undone",
        description: "Because a row got locked in the last turn"
      })
      return;
    }
    undo();
  }

  return (
    <button
      data-testid="undo"
      onClick={handleOnClick}
      disabled={disabled}
      className={cn('p-1.5 rounded-lg flex items-center justify-center bg-slate-200 ml-auto', disabled && 'opacity-30')}>
      <UndoIcon/>
    </button>
  );
}
