'use client'
import React, { useEffect, useState } from 'react'
import { MenuItem } from "../menu/MenuItem"
import { SectionHeaders } from "./SectionHeaders"
import Link from 'next/link'

export const HomeMenu = () => {

  const [itemsHighlighted, setItemsHighlighted] = useState([])

  useEffect(() => {
    fetch('api/menu-items').then(res => {
      res.json().then(menuItems => {
        setItemsHighlighted(menuItems.filter(item => item.highlight))
      })
    })
  }, [])


  return (
    <section className="mt-[70vh] mx-auto flex flex-col items-center">

      <SectionHeaders mainHeader={'Menu'} subHeader={'I gusti più amati'} />

      <div className="py-10 px-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 sm:px-0 gap-4">
        {
          itemsHighlighted.length > 0 && (
            itemsHighlighted.map(item => (
              <MenuItem key={item._id} item={item} />
            ))
          )
        }
      </div>
      <Link href={'/menu'} className='bg-primary border-collapse text-white text-sm px-2  md:w-1/3 text-center py-2 rounded-xl
      uppercase shadow-xl hover:bg-primaryHover'>
        Guarda il nostro menu completo</Link>
    </section>
  )
}
