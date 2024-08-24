import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full p-4 bg-stone-400 border-b-2 border-stone-800 text-white flex flex-col md:flex-row items-center justify-between gap-y-4">
      <Link
        href="/"
        className="flex flex-col md:flex-row items-center justify-center gap-2 text-lg"
      >
        <Image
          src="/icons/icon.png"
          alt="App Logo"
          height={510}
          width={510}
          className="h-[3rem] w-[3rem] rounded-xl shadow-inner"
        />
        <div className="text-center md:text-left">
          <h1 className="m-0 font-bold">Rate My Professor</h1>
        </div>
      </Link>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Link href="/create_review" className="btn-header">
          Submit A Review
        </Link>
        <Link href="/chat" className="btn-header">
          Find A Professor
        </Link>
      </div>
    </header>
  );
}
