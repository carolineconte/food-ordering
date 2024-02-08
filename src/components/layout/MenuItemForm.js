import EditableImage from '@/components/layout/EditableImage'

export default function MenuItemForm({ handleSubmit, menuItem }) {

  const [name, setName] = useState(menuItem?.name || '')
  const [description, setDescription] = useState(menuItem?.description || '')
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '')
  const [image, setImage] = useState(menuItem?.image || '')

  return (
    <form onSubmit={handleSubmit} className='mt-12'>
      <div className='flex flex-col items-center gap-4 md:flex-row md:items-start'>
        <EditableImage link={image} setLink={setImage} />

        <div className='flex flex-col'>
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

          <label>Prezzo iniziale:
            <input className='input'
              type="text" placeholder='Prezzo iniziale' required
              value={basePrice} onChange={e => setBasePrice(e.target.value)} />
          </label>
        </div>
      </div>

      <button className='btn flex mt-6 bg-secondary text-white hover:bg-secondaryHover' type='submit'>
        Modifica
      </button>
    </form>
  )
}