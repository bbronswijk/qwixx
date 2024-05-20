import { UndoIcon } from '@/ui/icons';
import { cn } from '@/utils/cn';

interface ComponentProps {
  disabled: boolean;
  onClick: () => void;
}

export default function UndoButton({disabled, onClick}: ComponentProps) {
  return (
    <button
      data-testid="undo"
      onClick={onClick}
      disabled={disabled}
      className={cn('p-1.5 rounded-lg flex items-center justify-center bg-slate-200 ml-auto', disabled && 'opacity-30')}>
      <UndoIcon/>
    </button>
  );
}
