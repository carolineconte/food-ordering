'use client'
import Link from "next/link";
import UseProfile from '../hooks/UseProfile';
import { useContext } from "react";
import { CartContext } from "../AppContext";

import CartIcon from '@/components/icons/CartIcon'
import { usePathname } from "next/navigation";

export default function CartButton() {

  const path = usePathname();
  const pagesToShow = path === '/' || path === '/menu';
  console.log(pagesToShow)
  
  const { cartProducts } = useContext(CartContext)
  const { data } = UseProfile()
  const { loading } = UseProfile();

  if(data.admin || loading){
    return ''
  }



  return (
    <>
      {cartProducts.length > 0 && pagesToShow  && (
        <Link href={'/cart'} className="fixed bottom-20 left-1/2 transform -translate-x-1/2 py-3 px-12 text-lg rounded-xl bg-secondary text-white flex items-center justify-between gap-12">
          <span className='grow text-center'>Ordinane</span>
          <CartIcon className='w-8 h-8' />

          <div className="absolute text-sm text-center bg-primary rounded-full w-[20px] h-[20px] text-white top-2 right-9 ml-4">
            <p>{cartProducts?.length}</p>
          </div>

        </Link>
      )}
    </>
  )
}