'use client'
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react'

function Header() {

  const session = useSession();
  const status = session?.status;

  console.log(session)
  return (
    <header className="flex pb-2 items-center justify-between border-b-2">
      <Link className="text-primary font-semibold text-2xl" href="">Fiorella</Link>
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link href={''}>Home</Link>
        <Link href={''}>Menu</Link>
        <Link href={''}>About</Link>
        <Link href={''}>Contact</Link>
      </nav>
      <nav className="flex items-center gap-4">
        {status === 'authenticated' &&
          <button className="bg-primary rounded-full text-white px-4 py-2"
            onClick={() => signOut()}>
            Esci
          </button>
        }
        {status === 'unauthenticated' &&
          <>
            <Link href={'/login'}>Accedi</Link>
            <Link href={'/register'} className="bg-primary rounded-full text-white px-4 py-2">
              Creare account
            </Link>
          </>
        }

      </nav>
    </header>
  )
}

export default Header