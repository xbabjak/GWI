import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="w-full h-20 bg-emerald-800 sticky top-0">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <div>
            <h1 className="text-white hidden sm:block">Cats</h1>
          </div>
          <ul className="flex gap-x-6 text-white">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/favourites">Favourites</Link>
            </li>
            <li>
              <Link href="/breeds">Breeds</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
