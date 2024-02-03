import React from 'react'

export const MenuItem = () => {
  return (
      <div className="bg-gray-300 border mb-4 sm:mb-0 p-4 rounded-lg text-center
      transition-all hover:bg-white hover:shadow-md hover:shadow-black/25">
        <div>
           <img className='max-h-auto max-h-32 block mx-auto' src="/pizza.png" alt="menu-item" />
        </div>
       
        <h4 className="font-semibold my-4">Pepperoni Pizza</h4>
        <p className="text-gray-500 text-sm">
          Lorem ipsum dolor sit amet.
        </p>
        <button className="bg-primary text-white rounded-full px-4 py-2 mt-4">Add to cart $12</button>
      </div>
  )
}
