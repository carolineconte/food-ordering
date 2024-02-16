'use client'
import UserTabs from '@/components/layout/UserTabs';
import UseProfile from '../../components/hooks/UseProfile';
import Link from 'next/link';
import Right from '@/components/icons/Right'
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function MenuItemsPage() {

  const { loading: profileLoading, data: profileData } = UseProfile()
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        setMenuItems(menuItems)
      })
    })
  }, [])

  if (profileLoading) {
    return 'Loading'
  }

  if (!profileData) {
    return 'Not allowed'
  }

  return (
    <section className='grow mx-auto my-12'>
      <UserTabs />

      <Link className='btn flex gap-6 items-center justify-center
      hover:shadow-sm hover:bg-slate-100/80' href={'/menu-items/new'}>
        Agg un nuovo piatto <Right />
      </Link>

      <div className='mt-6'>
        <h2 className='text-lg mb-2 underline p-1'>Selezionare il piatto da modificare:</h2>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 text-center'>
          {menuItems &&
            menuItems.map(item => (
              <Link href={'/menu-items/edit/' + item._id} key={item._id}
                className='capitalize gap-2 cursor-pointer text-xl rounded-lg shadow-sm border-4 border-slate-500
                hover:bg-slate-100/80'>
                <Image className='object-cover max-h-40 object-center w-full h-full' src={item.image} alt='piatto' width={250} height={100} />
                {item.name}
              </Link>
            ))}
        </div>
      </div>
    </section>
  )
}