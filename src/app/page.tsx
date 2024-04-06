import Link from 'next/link';
import { ChevronRightIcon } from '@/ui/icons';

export default function Home() {
  return (
    <main className="h-full w-full flex justify-center items-center">
      <div className="grid grid-cols-1 gap-3 w-full max-w-[600px]">
        <Link className="flex border leading-none p-5 rounded hover:bg-slate-50 duration-300 items-center"
              href="/default">
          <div>
            <h1 className="font-bold text-3xl">Qwixx</h1>
            <small className="text-slate-500 text-lg">Standaard</small>
          </div>
          <ChevronRightIcon className="ml-auto h-10 w-10 text-muted"/>
        </Link>

        <Link className="flex border leading-none p-5 rounded hover:bg-slate-50 duration-300 items-center"
              href="/variant-a">
          <div>
            <h1 className="font-bold text-3xl">Qwixx</h1>
            <small className="text-slate-500 text-lg">Bonus versie A</small>
          </div>
          <ChevronRightIcon className="ml-auto h-10 w-10 text-muted"/>
        </Link>

        <Link className="flex border leading-none p-5 rounded hover:bg-slate-50 duration-300 items-center"
              href="/variant-b">
          <div>
            <h1 className="font-bold text-3xl">Qwixx</h1>
            <small className="text-slate-500 text-lg">Bonus versie B</small>
          </div>
          <ChevronRightIcon className="ml-auto h-10 w-10 text-muted"/>
        </Link>

      </div>
    </main>
  );
}
