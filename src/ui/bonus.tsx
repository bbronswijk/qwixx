import BonusBox from '@/ui/bonus-box';
import { TriangleIcon } from '@/ui/icons';
import React, { Fragment } from 'react';
import { bonusBoxes } from '@/data/tiles';
import useQwixxStore from '@/state/qwixx.store';

export default function Bonus() {
  const selected = useQwixxStore(({ bonus }) => bonus.map(({ id }) => id));

  return (
    <div data-testid="bonus" className="flex border-2 border-slate-400 rounded-lg items-center p-2 lg:p-4">
        {bonusBoxes.map((item, index) => (<Fragment key={item.id}>
          <BonusBox  checked={selected.includes(item.id)} className={item.className}/>
          {index < (bonusBoxes.length -1) && <TriangleIcon className="h-4 w-4 mx-0.5 text-black"/>}
        </Fragment>))}
    </div>
  );
}