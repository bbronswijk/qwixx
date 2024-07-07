import Link from 'next/link';
import Image from 'next/image';
import { ChevronRightIcon } from '@/ui/icons';
import React from "react";
import { Members } from "@/components/ui/members";
import BackButton from "@/ui/back-button";

export default function Home({params}: { params: { roomId: string } }) {
  return (
    <main className="md:h-full p-4 flex flex-col items-center justify-center">
      <header className="fixed top-3 left-3 right-3 gap-3 flex items-center justify-between">
        <BackButton/>
      </header>
      <h1 className="text-3xl font-bold text-center w-full mt">Game pin: {params.roomId}</h1>
      <Members className="flex items-center my-2"/>

      <div className="flex items-center flex-col md:flex-row justify-center gap-8 p-8">
        <Link className="border rounded-xl hover:shadow-xl duration-300 overflow-hidden"
              href={`/${params.roomId}/default`}>
          <h1 className="text-slate-400 pt-6 text-center leading-none">Variant</h1>
          <h1 className="font-bold text-lg text-center mb-2 block">Standaard</h1>
          <Image src="/default.png" className="h-36 lg:h-80 mb-4 flex items-center justify-center object-contain"
                 alt="default variant" width={600} height={271} priority/>
          <button className="bg-slate-200 py-2 pl-4 pr-2 font-bold w-full flex items-center">
            Start
            <ChevronRightIcon className="ml-auto h-6 w-6 text-muted"/>
          </button>
        </Link>

        <Link className="border rounded-xl hover:shadow-xl duration-300 overflow-hidden"
              href={`/${params.roomId}/variant-a`}>
          <h1 className="text-slate-400 pt-6 text-center leading-none">Variant</h1>
          <h1 className="font-bold text-lg md:text-xl text-center block">Bonus variant A</h1>
          <Image src="/variant-a.png" className="h-36 lg:h-80 mb-4 flex items-center justify-center object-contain"
                 alt="Bonus variant A" width={600} height={313} priority/>
          <button className="bg-slate-200 py-2 pl-4 pr-2 font-bold w-full flex items-center">
            Start
            <ChevronRightIcon className="ml-auto h-6 w-6 text-muted"/>
          </button>
        </Link>

        <Link className="border rounded-xl hover:shadow-xl duration-300 overflow-hidden"
              href={`/${params.roomId}/variant-b`}>
          <h1 className="text-slate-400 pt-6 text-center leading-none">Variant</h1>
          <h1 className="font-bold text-lg md:text-xl text-center">Bonus variant B</h1>
          <Image src="/variant-b.png" className="h-36 lg:h-80 mb-4 flex items-center justify-center object-contain"
                 alt="default variant" width={600} height={313} priority/>
          <button className="bg-slate-200 py-2 pl-4 pr-2 font-bold w-full flex items-center">
            Start
            <ChevronRightIcon className="ml-auto h-6 w-6 text-muted"/>
          </button>
        </Link>
      </div>
    </main>
  )
    ;
}
