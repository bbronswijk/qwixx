import { PropsWithChildren } from 'react';

export default function Total({children, onClick}: PropsWithChildren & { onClick: () => void }) {
  return <div data-testid="total"
              onClick={onClick}
              className="bg-white/70 rounded-lg text-xl lg:text-4xl font-bold w-8 h-8 lg:w-14 lg:h-14 flex items-center justify-center">
    { children }
  </div>
}