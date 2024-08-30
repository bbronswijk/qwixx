import QwixxStore from "@/state/store";
import { calculateTotalPointsForRow } from "@/utils/map-number-checked-to-score";
import { EyeOffIcon } from "@/ui/icons";
import { TileModel } from "@/data/tile.model";

interface ComponentProps {
  tiles: TileModel[];
  selection: number[];
}

export default function TotalRowScore({ tiles, selection }: ComponentProps) {
  const toggleScoreVisibility = QwixxStore.use.toggleScoreVisibility();
  const showScore = QwixxStore.use.showScore();

  return (
    <div
      data-testid='total'
      onClick={toggleScoreVisibility}
      className='flex h-8 w-8 items-center justify-center rounded-lg bg-white/70 text-xl font-bold lg:h-14 lg:w-14 lg:text-4xl'
    >
      {showScore ? calculateTotalPointsForRow(tiles, selection) : <EyeOffIcon className='h-4 w-4 lg:h-6 lg:w-6' />}
    </div>
  );
}
