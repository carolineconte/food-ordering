'use client'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'

import BtnNavigate from '@/components/layout/BtnNavigate'
import UseProfile from '@/components/hooks/UseProfile';
import UserTabs from '@/components/layout/UserTabs';
import Left from '@/components/icons/Left';
import MenuItemForm from '@/components/layout/MenuItemForm';
import LoadingMsg from '@/components/LoadingMsg'


export default function NewMenuItem() {
  const { loading: profileLoading, data: profileData } = UseProfile()
  const router = useRouter();

  const handleSubmit = async (e, data) => {
    e.preventDefault();

   
    const savingPromise = fetch('/api/menu-items', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore durante il salvataggio. Riprova più tardi.');
        } else {
          router.push('/menu-items');
        }
      });

    await toast.promise(savingPromise, {
      loading: 'Caricamento in corso...',
      success: 'Il nuovo piatto è stato aggiunto al menu.',
      error: 'Oops! C`è stato un problema, riprova più tardi.',
    });
    router.push('/menu-items');

  }

  if (profileLoading) {
    return <LoadingMsg />
  }

  if (!profileData) {
    return 'Not allowed'
  }

  return (
    <section className='grow mx-auto my-12 w-3/4'>
      <UserTabs />
      <BtnNavigate href={'/menu-items'}>
        <Left /> Visualizzare tutti i piatti
      </BtnNavigate>

      <MenuItemForm menuItem={null} handleSubmit={handleSubmit} />

    </section>
  )
}