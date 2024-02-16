import Trash from '@/components/icons/Trash'
import { useState } from 'react'

export default function DeleteButton({ label, onDelete, confirmMsg }) {
  const [showConfirm, setShowConfirm] = useState(false)

  if (showConfirm) {
    return (
      <div className='fixed bg-black/80 inset-0 items-center flex justify-center h-full'>
        <div className='mt-6 mx-auto text-center bg-white p-6 rounded-lg border shadow-xl'>
          <p className=''>{confirmMsg}</p>
          <p className='underline mb-4 font-black tracking-wide'>Quest&apos;azione non può essere annullata!</p>

          <div className='flex justify-center gap-2'>
            <button className=' border-2 p-2 rounded-lg font-semibold text-lg text-black hover:bg-gray-100'
              onClick={() => setShowConfirm(false)}>
              Cancel
            </button>

            <button className='p-2 border-2 border-primaryHover rounded-lg font-semibold text-lg text-primary hover:bg-primaryHover hover:text-white '
              onClick={() => {
                onDelete();
                setShowConfirm(false)
              }}>
              Si, Elimina!
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <button className='btn flex bg-primary text-white'
      onClick={() => setShowConfirm(true)}>
      {label}
    </button>
  )
}