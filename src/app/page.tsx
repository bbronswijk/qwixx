import Link from 'next/link';

export default function Home() {
  return (
    <main className="h-full w-full flex justify-center items-center">
      <ul>
        <li><Link href="/default">Qwixx Standaard</Link></li>
        <li><Link href="/variant-a">Qwixx Bonus versie A</Link></li>
        <li><Link href="/variant-a">Qwixx Bonus versie B</Link></li>
      </ul>
    </main>
  );
}
