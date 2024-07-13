'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from "react";
import BackButton from "@/ui/back-button";
import QwixxStore from "@/state/store";
import { useParams } from "next/navigation";

export default function Home() {
  const {roomId} = useParams<{ roomId: string }>()
  const reset = QwixxStore.use.reset();

  return (
    <main className="md:h-full p-4 flex flex-col items-center justify-center bg-slate-100 gap-4">
      <header className="fixed top-3 left-3 right-3 gap-3 flex items-center justify-between">
        <BackButton/>
      </header>

      <h1 className="text-3xl font-bold text-center w-full">Game pin: {roomId}</h1>
      <div className="flex items-center flex-col md:flex-row justify-center gap-8 px-8">
        <Link className="border rounded-xl hover:shadow-xl duration-300 overflow-hidden bg-white"
              href={`/${roomId}/default`}
              onClick={() => reset()}>
          <h1 className="text-slate-400 pt-6 text-center leading-none">Variant</h1>
          <h1 className="font-bold text-lg text-center mb-2 block">Standaard</h1>
          <Image src="/default.png" className="h-36 lg:h-80 mb-4 flex items-center justify-center object-contain"
                 alt="default variant" width={600} height={271} priority/>
        </Link>

        <Link className="border rounded-xl hover:shadow-xl duration-300 overflow-hidden bg-white"
              href={`/${roomId}/variant-a`}
              onClick={() => reset()}>
          <h1 className="text-slate-400 pt-6 text-center leading-none">Variant</h1>
          <h1 className="font-bold text-lg md:text-xl text-center block">Bonus variant A</h1>
          <Image src="/variant-a.png" className="h-36 lg:h-80 mb-4 flex items-center justify-center object-contain"
                 alt="Bonus variant A" width={600} height={313} priority/>
        </Link>

        <Link className="border rounded-xl hover:shadow-xl duration-300 overflow-hidden bg-white"
              href={`/${roomId}/variant-b`}
              onClick={() => reset()}>
          <h1 className="text-slate-400 pt-6 text-center leading-none">Variant</h1>
          <h1 className="font-bold text-lg md:text-xl text-center">Bonus variant B</h1>
          <Image src="/variant-b.png" className="h-36 lg:h-80 mb-4 flex items-center justify-center object-contain"
                 alt="default variant" width={600} height={313} priority/>
        </Link>
      </div>
    </main>
  )
    ;
}
