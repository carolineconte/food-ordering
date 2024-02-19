import EditableImage from '@/components/layout/EditableImage'
import { useEffect, useState } from 'react'
import MenuItemPriceProps from '@/components/layout/menuItemPriceProps'

export default function MenuItemForm({ handleSubmit, menuItem }) {

  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [categorie, setCategorie] = useState(menuItem?.categorie || '')
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
  const [image, setImage] = useState(menuItem?.image || '');
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredients, setExtraIngredients] = useState(menuItem?.extraIngredients || []);
  const [categories, setCategories] = useState([])
  const [highlight, setHighlight] = useState(menuItem?.highlight || false)

  const data = { name, image, description, categorie, highlight, basePrice, sizes, extraIngredients };

  useEffect(() => {
    fetch('/api/categories').then(res => res.json().then(categories => {
      setCategories(categories)
    }))
  }, [])

  const submitClick = (e, data) => {
    e.preventDefault()
    if (!name || !basePrice || !description || !categorie) {
      alert('Compilare tutti i campi obbligatori')
      return
    }
    handleSubmit(e, data)
  }

  return (
    <form onSubmit={(e) => submitClick(e, data)} className='mt-12'>
      <div className='flex flex-col items-center gap-4 md:flex-row md:items-start'>
        <EditableImage link={image} setLink={setImage} />

        <div className='flex flex-col gap-2'>
          <label>Nome del piatto:
            <input className='input'
              type="text" placeholder='Nome del piatto' required
              value={name} onChange={e => setName(e.target.value)} />
          </label>

          <label>Descrizione:
            <input className='input'
              type="text" placeholder='Descrizione' required
              value={description} onChange={e => setDescription(e.target.value)} />
          </label>

          <label>Categoria:
            <select className='input'
              value={categorie}
              onChange={e => setCategorie(e.target.value)}>
              <option value=''>
                Seleziona categoria
              </option>
              {
                categories.map(cat =>
                  <option value={cat._id} key={cat._id}>
                    {cat.name}
                  </option>)
              }
            </select>
          </label>

          <label>Prezzo iniziale:
            <input className='input'
              type="text" placeholder='Prezzo iniziale' required
              value={basePrice} onChange={e => setBasePrice(e.target.value)} />
          </label>

          <label htmlFor='highlightCB' className='input mt-3'>
            <input id='highlightCB' type="checkbox"
              value={'1'} checked={highlight}
              onChange={e => setHighlight(e.target.checked)} />
            <span className='ml-2'>Mettere questo elemento in evidenza.</span>
          </label>

          <MenuItemPriceProps
            nameExtra={'variazioni'}
            btnExtra={'Aggiungi varianti del piatto.'}
            props={sizes} setProps={setSizes} />
          <MenuItemPriceProps
            nameExtra={'Opzioni degli ingredienti extra'}
            btnExtra={'Aggiungi ingredienti extra'}
            props={extraIngredients} setProps={setExtraIngredients} />
        </div>
      </div>

      <button type='submit'
        className='border px-10 mb-4 py-2 mx-auto block rounded-lg mt-6 bg-secondary text-white hover:bg-secondaryHover' >
        Salva
      </button>
    </form>
  )
}