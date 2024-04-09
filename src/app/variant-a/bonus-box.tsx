import { cn } from '@/utils/cn';
import { XIcon } from '@/ui/icons';

interface ComponentProps {
  className: string;
  checked: boolean;
}

export const bonusBoxState = {
  checked: 'checked',
  unchecked: 'unchecked',
} as const;

export default function BonusBox({ checked, className }: ComponentProps) {
  return <div
    data-testid="bonus-box"
    data-state={checked ? bonusBoxState.checked : bonusBoxState.unchecked}
    className={cn(className, 'border-4 lg:border-[6px] shadow border-white rounded font-bold h-5 w-5 lg:w-8 lg:h-8 flex items-center justify-center')}>
    {checked && <XIcon className="text-white"/>}
  </div>
}