import Trash from '@/components/icons/Trash'
import Up from '@/components/icons/Up'
import Down from '@/components/icons/Down'
import { useState } from 'react'

export default function MenuItemPriceProps({ nameExtra, btnExtra, props, setProps }) {

  const [isOpen, setIsOpen] = useState(false)

  const addProp = () => {
    setProps(OldProps => {
      return [...OldProps, { name: '', price: '' }]
    })
  }

  const editProp = (ev, i, prop) => {
    const newValue = ev.target.value;
    setProps(prevProps => {
      const newProps = [...prevProps]
      newProps[i][prop] = newValue
      return newProps
    })
  }

  const removeProp = (indexToRemove) => {
    setProps(prev => prev.filter((value, i) => i !== indexToRemove))
  }

  return (
    <div className='bg-slate-100 rounded-lg mt-4 p-2'>

      <button type='button' className=' py-2 w-full rounded-lg  mr-4 flex justify-left items-center gap-4'
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <Up /> : <Down />}
        <span>{nameExtra} <span className='rounded-full border px-2 py-1 font-black ml-2 bg-white'>{props?.length}</span></span>
      
      </button>

      {isOpen && (
        <>
          {props && props.map((prop, i) => (
            <div className='flex gap-1 items-end ' key={i}>
              <label>Inserisci il nome:
                <input className='input' type="text" placeholder='Nome'
                  value={prop.name} onChange={ev => editProp(ev, i, 'name')} />
              </label>
              <label>Costo extra:
                <input className='input' type="number" placeholder='Prezzo aggiuntivo'
                  value={prop.price} onChange={ev => editProp(ev, i, 'price')} />
              </label>
              <button type='button' className='btn bg-primary text-white'
                onClick={() => removeProp(i)}>
                <Trash />
              </button>
            </div>
          ))}

          <button type='button' className='btn block my-2 shadow-sm bg-white hover:bg-white/50'
            onClick={addProp}>
            {btnExtra}
          </button>
        </>
      )}
    </div>
  )
}