import { UndoIcon } from '@/ui/icons';
import { cn } from '@/utils/cn';
import QwixxStore, { ActionType } from "@/state/store";
import { useToast } from "@/ui/use-toast";


export default function UndoButton() {
  const undo = QwixxStore.use.undo();
  const userActions = QwixxStore.use.changes();
  const {toast} = useToast();

  const disabled = userActions.length === 0;

  return (
    <button
      data-testid="undo"
      onClick={() => {
        if (userActions.at(-1)?.actionType === ActionType.pusher) {
          toast({
            title: "The last action cannot be undone",
            description: "Someone else already locked a row after your turn"
          })
          return;
        }
        undo()
      }}
      disabled={disabled}
      className={cn('p-1.5 rounded-lg flex items-center justify-center bg-slate-200 ml-auto', disabled && 'opacity-30')}>
      <UndoIcon/>
    </button>
  );
}
