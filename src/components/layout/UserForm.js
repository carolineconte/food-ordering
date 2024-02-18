'use client'
import EditableImage from '@/components/layout/EditableImage'
import { useState } from 'react';
import UseProfile from '../../components/hooks/UseProfile';
import LoadingMsg from '@/components/LoadingMsg'

export default function UserForm({ user, onSave }) {
  const { loading, data } = UseProfile()

  const [userName, setUserName] = useState(user?.name || '')
  const [image, setImage] = useState(user?.image || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [address, setAddress] = useState(user?.addres || '')
  const [city, setCity] = useState(user?.city || '')
  const [postalCode, setPostalCode] = useState(user?.postalCode || '')
  const [country, setCountry] = useState(user?.country || '')
  const [email, setEmail] = useState(user?.email || '')
  const [admin, setAdmin] = useState(user?.admin || false)
  const userData = { name: userName, admin, image, phone, address, city, postalCode, country }

  if (loading) {
    return <LoadingMsg/>
  }

  if (!data && !loading) {
    return 'Not allowed'
  }

  return (
    <div className='flex flex-col items-center gap-4 md:flex-row md:items-start'>

      <EditableImage link={image} setLink={setImage} />

      <form className='flex grow flex-col justify-center gap-2' onSubmit={(e) => onSave(e, userData)}>
        <label className='label'>Nome e Cognome
          <input className='input text-black' type="text" placeholder='Nome e Cognome'
            value={userName} onChange={e => setUserName(e.target.value)} />
        </label>

        <label className='label'>Email:
          <input className='input text-gray-500' type="text" disabled value={email} />
        </label>

        <label className='label'>Numero telefono:
          <input className='input text-black' type="tel" placeholder='Telefone'
            value={phone} onChange={e => setPhone(e.target.value)} />
        </label>

        <label className='label'>Indirrizzo:
          <input className='input text-black' type="text" placeholder='Via, Corso...'
            value={address} onChange={e => setAddress(e.target.value)} />
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

        {data.admin && (
          <label htmlFor='adminCb'>
            <input id='adminCb' type="checkbox"
              value={'1'} checked={admin}
              onChange={e => setAdmin(e.target.checked)} />
            <span className='ml-2 uppercase'>Admin</span>
          </label>
        )}

        <button className='bg-primary px-8 py-2 rounded-xl mx-auto text-white
                           hover:bg-primaryHover hover:shadow'>
          Salva
        </button>
      </form>

    </div>
  )
}