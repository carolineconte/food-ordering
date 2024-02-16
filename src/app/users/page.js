'use client'
import { useEffect, useState } from 'react';
import UseProfile from '../../components/hooks/UseProfile';
import UserTabs from '@/components/layout/UserTabs';
import DeleteButton from '@/components/DeleteBtn'
import Trash from '@/components/icons/Trash'
import Config from '@/components/icons/Config'
import Link from 'next/link';

export default function UsersPage() {
  const { loading, data } = UseProfile()

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/api/users').then(res => {
      res.json().then(users => {
        setUsers(users)
      })
    })
  }, [])

  if (loading) {
    return 'Loading'
  }

  if (!data && !loading) {
    return 'Not allowed'
  }

  return (
    <section className='grow mx-auto my-12'>
      <UserTabs />

      <div className='mt-6'>
        <div className='table' >
          <span className='border-b-4 '>Nome:</span>
          <span className='border-b-4'>email:</span>
          
          <button className='border-b-4'>Config</button>
        </div>
        {
          users?.length > 0 && users.map(user => (
            <div key={user._id}
              className=' table my-3 bg-gray-100/50 p-2 rounded-lg'>
              <span>{user.name}</span>
              <span className='italic text-gray-500'>{user.email}</span>
              <Link className='btn bg-primary text-white' href={'/users/' + user._id}><Config className={'w-4 h-4'} /> </Link>

            </div>
          ))
        }
      </div>

    </section>

  )
}