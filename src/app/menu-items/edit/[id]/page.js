'use client'
import UseProfile from '../../../../components/hooks/UseProfile';
import UserTabs from '@/components/layout/UserTabs';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Left from '@/components/icons/Left';
import { useParams } from 'next/navigation';
import MenuItemForm from '../../../../components/layout/MenuItemForm'
import { useRouter } from 'next/navigation'
import DeleteButton from '@/components/DeleteBtn'
import LoadingMsg from '@/components/LoadingMsg'
import BtnNavigate from '@/components/layout/BtnNavigate'


export default function EditMenuItemPage() {
  const { loading, data } = UseProfile()
  const { id } = useParams();
  const router = useRouter();

  const [menuItem, setMenuItem] = useState(null)

  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json()
        .then(items => {
          const item = items.find(i => i._id === id)
          setMenuItem(item)
        })
    })
  }, [id])

  const handleSubmit = async (e, data) => {
    e.preventDefault();

    data = { ...data, _id: id };

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
      success: 'Le modifiche al piatto sono state salvate. ',
      error: 'Oops! C`è stato un problema, riprova più tardi.',
    });
  }

  const handleDelete = async () => {
    const savingPromise = fetch('/api/menu-items?_id=' + id, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Errore durante il salvataggio. Riprova più tardi.');
        }
      })

    await toast.promise(savingPromise, {
      loading: 'Stiamo applicando le tue modifiche, attendi un momento...',
      success: 'Successo! I tuoi cambiamenti sono stati salvati.',
      error: `Oops! C'è stato un problema, riprova più tardi.`
    })
    // Redireciona o usuário para outra página
    router.push('/menu-items');
  }

  if (loading) {
    return <LoadingMsg />
  }
  if (!data) {
    return 'Not allowed'
  }

  return (
    <section className='grow mx-auto my-12'>
      <UserTabs />
      <BtnNavigate href={'/menu-items'}>
        <Left /> Ritorna alla lista dei piatti
      </BtnNavigate>

      <MenuItemForm
        handleSubmit={handleSubmit}
        menuItem={menuItem}
      />

      <DeleteButton
        label={'Deleta piatto'}
        onDelete={handleDelete}
        confirmMsg={"Confermi l'eliminazione di questo piatto?"}
      />
    </section>
  )
}