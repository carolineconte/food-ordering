'use client'
import UseProfile from '../../../components/hooks/UseProfile';
import UserTabs from '@/components/layout/UserTabs';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Left from '@/components/icons/Left';
import MenuItemForm from '@/components/layout/MenuItemForm';
import { useRouter } from 'next/navigation'

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
        }else{
          router.push('/menu-items');
        }
      });

    await toast.promise(savingPromise, {
      loading: 'Caricamento in corso...',
      success: 'Il nuovo piatto è stato aggiunto al menu.',
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

      <MenuItemForm menuItem={null} handleSubmit={handleSubmit} />
 
    </section>
  )
}