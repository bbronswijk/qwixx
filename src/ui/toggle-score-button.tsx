import { EyeIcon, EyeOffIcon } from "@/ui/icons";
import { cn } from "@/utils/cn";
import QwixxStore from "@/state/store";

export default function ToggleScoreButton() {
  const showScore = QwixxStore.use.showScore();
  const toggleScoreVisibility = QwixxStore.use.toggleScoreVisibility();

  return (
    <button data-testid='toggle-score-visibility' onClick={toggleScoreVisibility} className={cn("flex items-center justify-center rounded-lg bg-slate-200 p-1.5")}>
      {showScore ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  );
}
