'use client'
import { useSession } from 'next-auth/react'
import SessionHeader from '@/components/SessionHeader'
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UserTabs from '@/components/layout/UserTabs'
import UserForm from '@/components/layout/UserForm'
import UseProfile from '@/components/hooks/UseProfile';
import Link from 'next/link';
import LoadingMsg from '@/components/LoadingMsg'


export default function ProfilePage() {
  const session = useSession();
  const { status } = session
  const { loading, data } = UseProfile();

  const [user, setUser] = useState(null)
  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile')
        .then(res => {
          res.json()
            .then(data => {
              setUser(data)
              setProfileFetched(true);
            })
        })
    }
  }, [session, status])



  async function handleProfileInfoUpdate(e, userProfile) {
    e.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userProfile)
      })
      if (res.ok)
        resolve()
      else
        reject()
    })

    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Saved',
      error: 'Si é verificato un problema. Riprova più tardi.'
    })

  }

  if (status === 'loading' || !profileFetched) {
    return <LoadingMsg/>
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  return (
    <section className='my-12 grow flex flex-col items-center'>

      {data?.admin ? <UserTabs /> : <SessionHeader>Profilo</SessionHeader>}

      <div className='max-w-xl mx-auto'>
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
      {
        !data.admin && (
          <Link className='btn w-1/3 mx-auto bg-secondary text-white'
            href={'/orders'}>Tutti i miei ordini
          </Link>)
      }


    </section>
  )
}