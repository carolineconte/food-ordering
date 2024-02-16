'use client'
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react'
import { useContext } from "react";
import { CartContext } from "../AppContext";
import CartIcon from '@/components/icons/CartIcon'

function Header() {

  const session = useSession();
  const status = session?.status

  const userData = session.data?.user
  let userName = userData?.name || userData?.email

  const { cartProducts } = useContext(CartContext)

  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0]
  }

  return (
    <header className="flex px-6 pb-2 items-center justify-between border-b-2">
      <Link className="text-primary font-semibold text-2xl" href="/">Fiorella</Link>
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link href={'/'}>Home</Link>
        <Link href={'/menu'}>Menu</Link>
        <Link href={'#about'}>About</Link>
        <Link href={'#contact'}>Contact</Link>
      </nav>
      <nav className="flex items-center gap-4">
        {status === 'authenticated' ? (
          <>
            <Link href={'/profile'}>Ciao, {userName}</Link>
            <button className="bg-primary rounded-full text-white px-4 py-2"
              onClick={() => signOut()}>
              Esci
            </button>
          </>
        ) : (
          <>
            <Link href={'/login'}>Accedi</Link>
            <Link href={'/register'} className="bg-primary rounded-full text-white px-4 py-2">
              Creare account
            </Link>
          </>
        )
        }
        <Link href={'/cart'} className="relative hover:bg-gray-300/50 p-2 rounded-full">
          <CartIcon className='w-8 h-8' />
          {cartProducts.length > 0 && (
            <div className="absolute text-sm text-center bg-primary rounded-full w-[20px] h-[20px] text-white top-0 right-0 ml-4">
              <p>{cartProducts?.length}</p>
            </div>
          )}
          </Link>
      </nav>
    </header>
  )
}

export default Header