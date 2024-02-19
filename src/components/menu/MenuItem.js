'use client'
import { useContext, useState } from 'react'
import { CartContext } from '../AppContext'
import MenuItemTile from '@/components/menu/menuItemTile'
import BtnAggCarrello from '@/components/menu/BtnAggCarrello'
import CloseIcon from '@/components/icons/CloseIcon'
import toast from 'react-hot-toast'


export const MenuItem = ({ item }) => {

  const { _id, name, description, image, basePrice, sizes, extraIngredients } = item;
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const hasOptions = sizes?.length > 0 || extraIngredients?.length > 0

  function handleAddToCart() {
    if (hasOptions && !showPopup) {
      setShowPopup(true)
      return
    }

    addToCart(item, selectedSize, selectedExtras)
    toast.success('Prodotto aggiunto al carrello con successo!')
    setSelectedExtras([])
    setSelectedSize(sizes?.[0] || null)
    setShowPopup(false)
  }


  function handleExtrasIngredients(e, extra) {
    const checked = e.target.checked;
    if (checked) {
      setSelectedExtras(prev => [...prev, extra])
    } else {
      setSelectedExtras(prev => {
        return prev.filter(e => e.name !== extra.name)
      })
    }
  }

  let totalPrice = basePrice
  if (selectedSize) {
    totalPrice += selectedSize.price
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      totalPrice += extra.price
    }
  }

  return (
    <>
      {showPopup && (
        <div className='flex items-center'>
          <div className='fixed inset-0 bg-black/80' onClick={() => setShowPopup(false)}/>

          <div className='overflow-auto absolute left-0 right-0 mx-auto w-[50%] z-10 bg-white p-6 rounded-lg flex flex-col justify-center items-center'>

            <button onClick={() => setShowPopup(false)}
              className='absolute transition-all text-xl text-white top-1 right-1 z-20 p-2 bg-primaryHover rounded-lg hover:scale-110'>
              <CloseIcon />
            </button>

            <MenuItemTile item={item} onClick={() => selectedSize()} />

            {sizes?.length > 0 && (
              <div className='extras'>
                <p className='text-center mb-2'>Seleziona la tua porzione</p>
                {sizes.map((size, i) => (
                  <label className='extrasInput' key={i}>
                    <input type='radio' name='size'
                      onClick={() => setSelectedSize(size)}
                      checked={selectedSize?.name === size.name}
                    />
                    <span className="grow">{size.name}</span>
                    <span> {(basePrice + size.price).toFixed(2)} €</span>
                  </label>
                ))}
              </div>
            )}

            {extraIngredients?.length > 0 && (
              <div className='extras'>
                <p className='text-center mb-2'>Vuoi aggiungere qualcosa?</p>
                {extraIngredients.map((extra, i) => (
                  <label className='extrasInput' key={i}
                    onChange={(e) => handleExtrasIngredients(e, extra)}>
                    <input type='checkbox' name={extra.name} />
                    <span className="grow">{extra.name}</span>
                    <span className='text-primaryHover font-semibold'> {(extra.price).toFixed(2)} €</span>
                  </label>
                ))}
              </div>
            )}

            <BtnAggCarrello addCartClick={handleAddToCart} item={item}>
              Aggiungi al carrello € {(totalPrice).toFixed(2)}
            </BtnAggCarrello>
          </div>

        </div>
      )}

      <div className="bg-gray-300 border mb-4 p-4 rounded-lg text-center flex flex-col 
                          transition-all sm:mb-0  hover:bg-white hover:shadow-md hover:shadow-black/25">
        <MenuItemTile item={item} />
        <BtnAggCarrello addCartClick={handleAddToCart} item={item}>
          {hasOptions ?
            `A partire da € ${(basePrice).toFixed(2)}`
            :
            `Aggiungi al carrello € ${(basePrice).toFixed(2)}`}

        </BtnAggCarrello>
      </div>
    </>
  )
}
