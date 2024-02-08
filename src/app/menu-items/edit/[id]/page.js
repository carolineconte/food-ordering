'use client'
import UseProfile from '../../../../components/hooks/UseProfile';
import UserTabs from '@/components/layout/UserTabs';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Left from '@/components/icons/Left';
import { useParams } from 'next/navigation';

export default function EditMenuItemPage() {
  const { loading: profileLoading, data: profileData } = UseProfile()
  const { id } = useParams();

  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(items => {
        const item = items.find(i => i._id === id)
        setImage(item.image)
        setName(item.name)
        setDescription(item.description)
        setBasePrice(item.basePrice)
      })
    })
  }, [id])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { image, name, description, basePrice, _id:id };

    const savingPromise = fetch('/api/menu-items', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore durante il salvataggio. Riprova più tardi.');
        }
      });

    await toast.promise(savingPromise, {
      loading: 'Caricamento in corso...',
      success: 'Successo! Nuova categoria salvata.',
      error: 'Oops! C`è stato un problema, riprova più tardi.',
    });

  }

  if (profileLoading) {
    return 'Loading'
  }

  if (!profileData) {
    return 'Not allowed'
  }

  return (
    <section className='grow mx-auto my-12'>
      <UserTabs />
      <Link className='btn flex gap-6 items-center justify-center my-8
      hover:shadow-sm hover:bg-slate-100/80' href={'/menu-items'}>
        <Left /> Visualizzare tutti i piatti
      </Link>

    <MenuItemForm />
    </section>
  )
}