import QwixxStore from "@/state/store";
import { calculateTotalPointsForRow } from "@/utils/map-number-checked-to-score";
import { EyeOffIcon } from "@/ui/icons";
import { TileModel } from "@/data/tile.model";

interface ComponentProps {
  tiles: TileModel[];
  selection: number[];
}

export default function TotalRowScore({tiles, selection}: ComponentProps) {
  const toggleScoreVisibility = QwixxStore.use.toggleScoreVisibility();
  const showScore = QwixxStore.use.showScore();

  return <div data-testid="total"
              onClick={toggleScoreVisibility}
              className="bg-white/70 rounded-lg text-xl lg:text-4xl font-bold w-8 h-8 lg:w-14 lg:h-14 flex items-center justify-center">
    {showScore
      ? calculateTotalPointsForRow(tiles, selection)
      : <EyeOffIcon className="h-4 w-4 lg:h-6 lg:w-6 "/>
    }
  </div>
}