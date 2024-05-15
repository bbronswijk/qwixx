import Link from 'next/link';
import Image from 'next/image';
import { ChevronRightIcon } from '@/ui/icons';

export default function Home() {
  return (
    <main className="h-full w-full flex items-center justify-center gap-8 p-8">
      <Link className="border rounded-xl hover:shadow-xl duration-300 overflow-hidden" href="/default">
        <h1 className="text-slate-400 pt-6 text-center leading-none">Variant</h1>
        <h1 className="font-bold text-lg text-center">Standaard</h1>
        <div className="h-32 lg:h-80 mb-4 flex items-center justify-center">
          <Image src="/default.png" alt="default variant" width={600} height={271}/>
        </div>
        <button className="bg-slate-200 py-2 pl-4 pr-2 font-bold w-full flex items-center">
          Start
          <ChevronRightIcon className="ml-auto h-6 w-6 text-muted"/>
        </button>
      </Link>

      <Link className="border rounded-xl hover:shadow-xl duration-300 overflow-hidden" href="/variant-a">
        <h1 className="text-slate-400 pt-6 text-center leading-none">Variant</h1>
        <h1 className="font-bold text-lg md:text-xl text-center">Bonus variant A</h1>
        <div className="h-32 lg:h-80 mb-4 flex items-center justify-center">
          <Image src="/variant-a.png" alt="Bonus variant A" width={600} height={313}/>
        </div>
        <button className="bg-slate-200 py-2 pl-4 pr-2 font-bold w-full flex items-center">
          Start
          <ChevronRightIcon className="ml-auto h-6 w-6 text-muted"/>
        </button>
      </Link>

      <Link className="border rounded-xl hover:shadow-xl duration-300 overflow-hidden" href="/variant-b">
        <h1 className="text-slate-400 pt-6 text-center leading-none">Variant</h1>
        <h1 className="font-bold text-lg md:text-xl text-center">Bonus variant B</h1>
        <div className="h-32 lg:h-80 mb-4 flex items-center justify-center">
          <Image src="/variant-b.png" alt="default variant" width={600} height={313}/>
        </div>
        <button className="bg-slate-200 py-2 pl-4 pr-2 font-bold w-full flex items-center">
          Start
          <ChevronRightIcon className="ml-auto h-6 w-6 text-muted"/>
        </button>
      </Link>
    </main>
  )
    ;
}
