import { PropsWithChildren } from 'react';

interface ComponentProps extends PropsWithChildren {

}

export default function Total({ children }: ComponentProps) {
  return <div data-testid="total" className="bg-white/70 rounded-lg text-4xl font-bold w-12 h-12 flex items-center justify-center">
    { children }
  </div>
}