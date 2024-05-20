import { EyeIcon, EyeOffIcon } from '@/ui/icons';
import { cn } from '@/utils/cn';

interface ComponentProps {
  visible: boolean;
  onClick: () => void;
}

export default function ToggleScoreButton({visible, onClick}: ComponentProps) {
  return (
    <button
      onClick={onClick}
      className={cn('p-1.5 rounded-lg flex items-center justify-center bg-slate-200')}>
      {visible ? <EyeOffIcon/> : <EyeIcon/>}
    </button>
  );
}
