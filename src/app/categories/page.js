'use client'
import UseProfile from '../../components/hooks/UseProfile';
import UserTabs from '@/components/layout/UserTabs';
import LoadingMsg from '@/components/LoadingMsg'

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Edit from '@/components/icons/Edit'
import Trash from '@/components/icons/Trash'
import DeleteButton from '@/components/DeleteBtn'

export default function Categories() {

  const { loading: profileLoading, data: profileData } = UseProfile()

  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null)

  const handleCategorySubmit = (e) => {
    e.preventDefault();

    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName }
      if (editedCategory) {
        data._id = editedCategory._id
      }

      const res = await fetch('/api/categories', {
        method: editedCategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      fetchCategories()
      setCategoryName('')
      setEditedCategory(null)

      res.ok ? resolve() : reject();

      await toast.promise(creationPromise, {
        loading: editedCategory ? 'Stiamo applicando le tue modifiche, attendi un momento...' : 'Caricamento in corso...',
        success: editedCategory ? 'Successo! I tuoi cambiamenti sono stati salvati.' : 'Successo! Nuova categoria salvata.',
        error: `Oops! C'è stato un problema, riprova più tardi.`
      })
    })
  }

  const handleDelete = async (_id) => {
    const savingPromise = fetch('/api/categories?_id=' + _id, {
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
    fetchCategories()
  }

  //Modo de atualizar a lista assim que adicionamos mais uma categoria.
  async function fetchCategories() {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('Errore nel caricamento delle categorie.');
      }
      const categories = await response.json();
      if (categories.length === 0) {
        throw new Error('Nessuna categoria trovata.');
      }
      setCategories(categories);
    } catch (error) {
      console.error('Si è verificato un errore:', error.message);
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  if (profileLoading) {
    return <LoadingMsg />
  }

  if (!profileData && !profileLoading) {
    return 'Not allowed'
  }

  return (
    <section className='grow mx-auto my-12 md:w-1/2 '>
      <UserTabs />

      <form onSubmit={handleCategorySubmit}>
        <label className='grow w-full'>
          <span className='w-full'>{editedCategory ? 'Modifica Categoria: ' : 'Nuova Categoria:'}</span>
          {editedCategory && (<span className='underline w-full font-bold text-primary'>{editedCategory.name}</span>)}
        </label>

        <div className='flex md:flex-nowrap flex-wrap'>
          <input type="text" name="" className='input' placeholder='Nome categoria'
            value={categoryName} onChange={e => setCategoryName(e.target.value)}
          />
          <div className='flex w-full justify-center gap-3 items-center'>
            <button className='border px-6 py-3 font-bold rounded-lg text-lg hover:bg-gray-300' type='submit'>
              {editedCategory ? 'Modifica' : 'Aggiungi'}
            </button>

            {editedCategory &&
              <button className='border px-6 py-3 font-bold rounded-lg text-lg hover:bg-gray-300' type='button'
                onClick={() => { setEditedCategory(null); setCategoryName('') }}>
                Cancela
              </button>
            }</div>
        </div>
      </form>

      <div className='mt-6'>
        <h2 className='text-lg mb-2'>Modifica nome categoria:</h2>
        {
          categories?.length > 0 && categories.map(cat => (
            <div key={cat._id} className='w-full flex justify-between items-center my-3 bg-gray-100 p-2 rounded-lg'>
              <span>{cat.name}</span>

              <div className='flex gap-2 items-center'>
                <button type='button'
                  className='btn flex bg-secondary text-white'
                  onClick={() => {
                    setEditedCategory(cat);
                    setCategoryName(cat.name)
                  }}>
                  <Edit className={'w-4 h-4'} />
                </button>

                <DeleteButton
                  label={<Trash className={'w-4 h-4'} />}
                  onDelete={() => handleDelete(cat._id)}
                  confirmMsg={"Confermi l'eliminazione di questo piatto?"}
                />
              </div>
            </div>
          ))
        }
      </div>
    </section>
  )
}