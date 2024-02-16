'use client'
import { useEffect, useState } from 'react';
import UseProfile from '@/components/hooks/UseProfile';
import UserTabs from '@/components/layout/UserTabs';
import { useParams } from 'next/navigation';
import UserForm from '@/components/layout/UserForm'
import toast from 'react-hot-toast';

export default function EditUserPage() {
  //Info perfil do usuario logado
  const { loading, data } = UseProfile();

  const { id } = useParams();

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch('/api/profile?_id=' + id).then(res => {
      res.json().then(user => {
        setUser(user)
      })
    })
  }, [id])

  const handleUserEdit = async (e, userInfo) => {
    e.preventDefault()
    const savingPromise = fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...userInfo, _id: id })
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
  }

  if (loading) {
    return 'Loading'
  }

  if (!user) {
    return 'User not found'
  }

  if (!data.admin && !loading) {
    return 'Not allowed'
  }

  return (
    <section className='grow mx-auto my-12'>
      <UserTabs isAdmin={true} />

      <div className='max-w-xl mx-auto'>
        <UserForm user={user} onSave={handleUserEdit} />
      </div>

    </section>
  )
}