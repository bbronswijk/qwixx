import Link from 'next/link';
import { ChevronRightIcon } from '@/ui/icons';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-3 p-4 w-full max-w-[600px] mx-auto">

      <Link className="border rounded hover:shadow-xl duration-300"
              href="/default">
        <Image src="/default.png" alt="default variant" width={600} height={271}/>
        <div className="flex px-5 pb-5 items-center">
          <h1 className="font-bold text-2xl">Standaard</h1>
          <ChevronRightIcon className="ml-auto h-10 w-10 text-muted"/>
          </div>
        </Link>

      <Link className="border rounded hover:shadow-xl duration-300"
              href="/variant-a">
        <Image src="/variant-a.png" alt="Bonus variant A" width={600} height={313}/>

        <div className="flex px-5 pb-5 items-center">
          <h1 className="font-bold text-2xl">Bonus variant A</h1>
          <ChevronRightIcon className="ml-auto h-10 w-10 text-muted"/>
          </div>
        </Link>

      <Link className="border rounded hover:shadow-xl duration-300"
              href="/variant-b">
        <Image src="/variant-b.png" alt="default variant" width={600} height={313}/>

        <div className="flex px-5 pb-5 items-center">
          <h1 className="font-bold text-2xl">Bonus variant B</h1>
          <ChevronRightIcon className="ml-auto h-10 w-10 text-muted"/>
          </div>
        </Link>

      </div>
  );
}
