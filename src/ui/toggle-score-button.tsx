import { EyeIcon, EyeOffIcon } from '@/ui/icons';
import { cn } from '@/utils/cn';
import QwixxStore from "@/state/store";

export default function ToggleScoreButton() {
  const showScore = QwixxStore.use.showScore();
  const toggleScoreVisibility = QwixxStore.use.toggleScoreVisibility();

  return (
    <button
      data-testid="toggle-score-visibility"
      onClick={toggleScoreVisibility}
      className={cn('p-1.5 rounded-lg flex items-center justify-center bg-slate-200')}>
      {showScore ? <EyeOffIcon/> : <EyeIcon/>}
    </button>
  );
}
