import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const { data: session, status }: { data: any; status: string } = useSession();

  return (
    <nav className="flex bg-gray-800 py-2 px-5 justify-between">
      <div className="flex items-center w-100">
        <h1 className="text-white ">Navbar</h1>
        <ul className="flex ml-5">
          <Link href="/">
            <li
              className={`mr-3 hover:text-cyan-600 ${pathname === "/" ? "text-cyan-500" : "text-white"}`}
            >
              Home
            </li>
          </Link>
          <Link href="/about">
            <li
              className={`mr-3 hover:text-cyan-600 ${pathname === "/about" ? "text-cyan-500" : "text-white"}`}
            >
              About
            </li>
          </Link>
          <Link href="/about/profile">
            <li
              className={`mr-3 hover:text-cyan-600 ${pathname === "/about/profile" ? "text-cyan-500" : "text-white"}`}
            >
              Profile
            </li>
          </Link>
        </ul>
      </div>
      <div>
        {status === "authenticated" ? (
          <div className="flex justify-center items-center">
            <Image src="/images/profile.webp" alt="profile" width={100} height={100} className="w-10 h-10 rounded-full mr-3"/>
            <h4 className="text-white mr-3 h-7">{session?.user?.fullname}</h4>
            <button
              className="bg-white rounded-md px-3 active:bg-cyan-600 active:text-white text-sm h-7 cursor-pointer"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="bg-white rounded-md px-3 active:bg-cyan-600 active:text-white  text-sm h-6 cursor-pointer"
            onClick={() => signIn()}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
