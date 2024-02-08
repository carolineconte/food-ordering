'use client'
import UseProfile from '../../../components/hooks/UseProfile';
import UserTabs from '@/components/layout/UserTabs';
import { useState } from 'react';
import EditableImage from '@/components/layout/EditableImage'
import toast from 'react-hot-toast';
import Link from 'next/link';
import Left from '@/components/icons/Left';

export default function NewMenuItem() {
  const { loading: profileLoading, data: profileData } = UseProfile()

  const [editedItem, setEditedItem] = useState(null)
  const [itemName, setItemName] = useState('')
  const [description, setDescription] = useState('')
  const [basePrice, setBasePrice] = useState('')
  const [image, setImage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { image, name: itemName, description, basePrice };

    const savingPromise = fetch('/api/menu-items', {
      method: 'POST',
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
      <form onSubmit={handleSubmit} className='mt-12'>

        <div className='flex flex-col items-center gap-4 md:flex-row md:items-start'>
          <EditableImage link={image} setLink={setImage} />

          <div className='flex flex-col'>
            <label>Nome del piatto:
              <input className='input'
                type="text" placeholder='Nome del piatto' required
                value={itemName} onChange={e => setItemName(e.target.value)} />
            </label>

            <label>Descrizione:
              <input className='input'
                type="text" placeholder='Descrizione' required
                value={description} onChange={e => setDescription(e.target.value)} />
            </label>

            <label>Prezzo iniziale:
              <input className='input'
                type="text" placeholder='Prezzo iniziale' required
                value={basePrice} onChange={e => setBasePrice(e.target.value)} />
            </label>
          </div>
        </div>

        <button className='btn flex mt-6 bg-secondary text-white hover:bg-secondaryHover' type='submit'>
          {editedItem ? 'Modifica' : 'Aggiungere nuovo piatto al menu'}
        </button>
      </form>
    </section>
  )
}