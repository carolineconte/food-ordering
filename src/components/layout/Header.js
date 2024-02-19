'use client'
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react'
import UserIcon from '@/components/icons/UserIcon'
import MenuIcon from '@/components/icons/MenuIcon'
import { useState } from "react";


function Header() {

  const session = useSession();
  const status = session?.status

  const userData = session.data?.user
  let userName = userData?.name || userData?.email

  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0]
  }

  function AuthLinks({ status }) {
    if (status === 'authenticated') {
      return (
        <>
          <Link className="bg-secondary menuBtn" href={'/profile'}>
            Accedi tuo profilo <UserIcon />
          </Link>
          <button className="bg-primary menuBtn"
            onClick={() => signOut()}>
            Esci
          </button>
        </>
      )
    }
    if (status === 'unauthenticated') {
      return (
        <>
          <Link href={'/login'} className="px-5 py-2 rounded-full hover:bg-secondaryHover/50"> Accedi</Link >
          <Link href={'/register'} className="bg-primary menuBtn text-center">Creare account</Link>
        </>
      )
    }
  }

  return (
    <>
      {/* Menu mobile */}
      <header className="md:hidden px-10 pt-6 pb-4">
        <div className="flex justify-between items-center border-b">
          <Link className="text-primary font-semibold text-2xl" href="/">Fiorella</Link>
          <button onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            <MenuIcon />
          </button>
        </div>

        <div onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className={mobileNavOpen ? 'fixed bg-white right-0 left-0 pb-4 ' : 'hidden'}>
          <nav className="flex flex-col items-center text-gray-500 font-semibold navMob">
            <Link href={'/'}>Home</Link>
            <Link href={'/menu'}>Ordina</Link>
            <Link href={'#about'}>Storia</Link>
            <Link href={'#contact'}>Contattaci</Link>
            <div className="flex flex-col gap-4 mt-4">
            <AuthLinks status={status} />
            </div>
          </nav>
        </div>
      </header>

      {/* Menu largescreen */}
      <header className="hidden px-10 pt-6 pb-4  md:flex  items-center justify-between border-b-2">
        <Link className="text-primary font-semibold text-2xl" href="/">Fiorella</Link>
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link href={'/menu'}>Ordina</Link>
            <Link href={'#about'}>Storia</Link>
            <Link href={'#contact'}>Contattaci</Link>

        </nav>
        <nav className="flex items-center justify-center gap-4">
          <AuthLinks status={status} />
        </nav>
      </header>
    </>
  )
}

export default Header

