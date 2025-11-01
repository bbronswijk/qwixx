import { EyeIcon, EyeOffIcon } from "@/ui/icons";
import { cn } from "@/utils/cn";
import { useActions, useShowScore } from "@/state/store";

export default function ToggleScoreButton() {
  const showScore = useShowScore();
  const { toggleScoreVisibility } = useActions();

  return (
    <button data-testid='toggle-score-visibility' onClick={toggleScoreVisibility} className={cn("flex items-center justify-center rounded-lg bg-slate-200 p-1.5")}>
      {showScore ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  );
}
