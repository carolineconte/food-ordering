'use client'
import UserTabs from '@/components/layout/UserTabs';
import { useEffect, useState } from 'react';
import UseProfile from '../../components/hooks/UseProfile';
import toast from 'react-hot-toast';

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
    return 'Loading'
  }

  if (!profileData && !profileLoading) {
    return 'Not allowed'
  }

  return (
    <section className='grow mx-auto my-12 '>
      <UserTabs />
      
      <form className='flex gap-2 items-end'onSubmit={handleCategorySubmit}>
        <label className='grow'>
          {editedCategory ? 'Modifica Categoria: ' : 'Nuova Categoria:'}
          {editedCategory &&
            (<span className='underline font-bold text-primary'>{editedCategory.name}</span>)}
          <input type="text" name="" className='input' placeholder='Nome categoria'
            value={categoryName} onChange={e => setCategoryName(e.target.value)} />
        </label>
        <button className='btn h-fit' type='submit'>
          {editedCategory ? 'Modifica' : 'Creare'}
        </button>
      </form>

      <div className='mt-6'>
        <h2 className='text-lg mb-2'>Modifica nome categoria:</h2>
        {
          categories?.length > 0 && categories.map(cat => (
            <button key={cat._id}
              onClick={() => {
                setEditedCategory(cat);
                setCategoryName(cat.name)
              }}
              className='bg-slate-200 mb-2 hover:bg-slate-300/80 w-full px-4 py-2 text-left font-medium text-lg rounded-lg shadow-sm border'>
              <span>{cat.name}</span>
            </button>
          ))
        }
      </div>
    </section>
  )
}