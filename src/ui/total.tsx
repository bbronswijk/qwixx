import { PropsWithChildren } from 'react';

interface ComponentProps extends PropsWithChildren {

}

export default function Total({ children }: ComponentProps) {
  return <div data-testid="total" className="bg-white/70 rounded-lg text-2xl lg:text-4xl font-bold w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center">
    { children }
  </div>
}