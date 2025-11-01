import { Config } from "@/data/config.model";
import { getTotalNumberOfSelectedSteps } from "@/utils/getTotalNumberOfSelectedSteps";
import React, { Fragment } from "react";
import BonusBox from "@/app/[gameId]/bonus-a/bonus-box";
import { TriangleIcon } from "@/ui/icons";
import { mapNumberCheckedToScore } from "@/utils/map-number-checked-to-score";
import QwixxStore from "@/state/store";

export const SelectedBlackTiles = ({ config }: { config: Config }) => {
  const numberOfSelectedSteps = getTotalNumberOfSelectedSteps(config);
  const showScore = QwixxStore.use.showScore();

  return (
    <div className='flex items-center rounded-lg py-2 lg:py-4'>
      {Array.from({ length: 11 }).map((_, index) => (
        <Fragment key={index}>
          <BonusBox checked={index < numberOfSelectedSteps} className='border-none bg-slate-600 text-white' />
          {index < 10 && <TriangleIcon className='mx-0.5 h-4 w-4 text-black' />}
        </Fragment>
      ))}

      {showScore && (
        <div className='ml-auto mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/70 text-xl font-bold lg:h-14 lg:w-14 lg:text-4xl'>
          {mapNumberCheckedToScore(numberOfSelectedSteps)}
        </div>
      )}
    </div>
  );
};
