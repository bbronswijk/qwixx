import Link from 'next/link';

export default function Home() {
  return (
    <main className="h-full w-full flex justify-center items-center">
      <div className="grid grid-cols-3 gap-3">
        <Link className="border font-bold text-center p-5 rounded hover:bg-slate-50 duration-300" href="/default">
          <h1>Qwixx</h1>
          <small>Standaard</small>
        </Link>
        <Link className="border font-bold text-center p-5 rounded hover:bg-slate-50 duration-300" href="/variant-a">
          <h1>Qwixx</h1>
          <small>Bonus versie A</small>
        </Link>
        <Link className="border font-bold text-center p-5 rounded hover:bg-slate-50 duration-300" href="/variant-b">
          <h1>Qwixx</h1>
          <small>Bonus versie B</small>
        </Link>
      </div>
    </main>
  );
}
