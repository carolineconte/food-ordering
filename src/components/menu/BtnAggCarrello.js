export default function BtnAggCarrello({ children, addCartClick, item }) {

  return (
    <button type='button'
    onClick={() => addCartClick(item)}
      className="bg-primary text-white rounded-full px-4 py-2 mt-4">
      {children}
    </button>
  )
}