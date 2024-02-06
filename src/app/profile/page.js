'use client'

import { useSession } from 'next-auth/react'
import SessionHeader from '@/components/SessionHeader'
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


export default function ProfilePage() {
  const session = useSession();
  const { status } = session
  const [userName, setUserName] = useState('')
  const [image, setImage] = useState('')
  const [phone, setPhone] = useState('')
  const [addres, setAddres] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  useEffect(() => {
    if (status === 'authenticated') {

      setUserName(session.data.user.name)
      setImage(session.data.user.image)

      fetch('/api/profile')
        .then(res => {
          res.json()
            .then(data => {
              setPhone(data.phone)
              setCity(data.city)
              setPostalCode(data.postalCode)
              setCountry(data.country)
            })
        })
    }
  }, [session, status])

  async function handleProfileInfoUpdate(e) {
    e.preventDefault();

    const userProfile = {
      name: userName,
      image,
      phone,
      city,
      postalCode,
      country
    }

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
      error: 'erro'
    })

  }

  async function handleImgChange(e) {
    e.preventDefault();
    const files = e.target.files;

    if (files?.length === 1) {
      const data = new FormData
      data.set('file', files[0])

      const uploadPromise = fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then(res => {

        if (res.ok) {
          return res.json().then(link => {
            setImage(link)
          })
        }
        throw new Error('Something went wrong!')
      })

      await toast.promise(uploadPromise, {
        loading: 'Uploading...',
        success: 'Upload',
        error: 'erro'
      })
    }
  }

  if (status === 'loading') {
    return 'Loading...'
  }

  if (status === 'unauthenticated') {
    return redirect('/login')
  }

  return (
    <section className='my-12 grow'>

      <SessionHeader> PROFILO </SessionHeader>

      <div className='max-w-xl mx-auto mt-4'>
        <div className='flex flex-col items-center gap-4 md:flex-row md:items-start'>

          <div className='w-52 flex flex-col text-center md:mt-4'>
            <div className=' bg-gray-300 p-4 rounded-lg'>
              <Image src={image ? image : '/user.png'} width={250} height={250} alt='profile image'></Image>
            </div>

            <label>
              <input type="file" className='hidden' onChange={handleImgChange} />
              <span className='border block mt-2 px-4 py-2 rounded-full shadow-md bg-white'>Update</span>
            </label>
          </div>

          <form className='flex grow flex-col justify-center gap-2' onSubmit={handleProfileInfoUpdate}>
            <label className='label'>Nome e Cognome
              <input className='input text-black' type="text" placeholder='Nome e Cognome'
                value={userName} onChange={e => setUserName(e.target.value)}/>
            </label>

            <label className='label'>Email:
              <input className='input' type="text" disabled value={session.data.user.email} />
            </label>

            <label className='label'>Numero telefono:
              <input className='input text-black' type="tel" placeholder='Telefone'
                value={phone} onChange={e => setPhone(e.target.value)} />
            </label>

            <label className='label'>Indirrizzo:
              <input className='input text-black' type="tel" placeholder='Telefone'
                value={addres} onChange={e => setAddres(e.target.value)} />
            </label>

            <div className='flex gap-2'>
              <label className='label'>Citta:
                <input className='input text-black' type="text" placeholder='Citta'
                  value={city} onChange={e => setCity(e.target.value)} />
              </label>

              <label className='label'>CAP:
                <input className='input text-black' type="text" placeholder='CAP'
                  value={postalCode} onChange={e => setPostalCode(e.target.value)} />
              </label>
            </div>

            <label className='label'>Paese:
              <input className='input text-black' type="text" placeholder='Paese'
                value={country} onChange={e => setCountry(e.target.value)} />
            </label>

            <button className='bg-primary px-8 py-2 rounded-xl mx-auto text-white'>Salva</button>
          </form>

        </div>
      </div>
    </section>
  )
}