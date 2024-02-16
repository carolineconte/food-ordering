import MenuExtrasCard from '@/components/menu/MenuExtrasCard'
import MenuItemTile from '@/components/menu/menuItemTile'

export default function Modal(){
  return(
    <div>
          <div className='fixed inset-0 bg-black/80'
            onClick={() => setShowPopup(false)}
          />

          <div style={{ maxHeight: 'calc(100vh - 100px)' }}
            className='overflow-auto absolute top-[10%] left-0 right-0 mx-auto w-[90%] z-10 bg-white p-6 rounded-lg flex flex-col justify-center items-center'>
            <MenuItemTile item={item} />
            {sizes.length > 0 && (
              <MenuExtrasCard arr={sizes} type={'radio'} baseprice={item.basePrice} title={'Seleziona la tua porzione'} />
            )}
            {extraIngredients.length > 0 && (
              <MenuExtrasCard arr={extraIngredients} type={'checkbox'} title={'Vuoi aggiungere qualcosa?'} />
            )}
          </div>

        </div>
  )
}