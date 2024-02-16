'use client'
import { SessionProvider } from 'next-auth/react'
import { useState, createContext, useEffect } from 'react'
import toast from 'react-hot-toast';

export const CartContext = createContext({})

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;
  if (cartProduct.size) {
    price += cartProduct.size.price
  }
  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += extra.price
    }
  }
  return price;
}

export function AppProvider({ children }) {

  const [cartProducts, setCartProducts] = useState([]);
  // indicates that the code is running in a web browser environment,sed to safely access localStorage in browser environments without causing errors in non-browser environments.
  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')))
    }
  }, [])

  function saveCartProductsToLocalStorage(cartProducts) {
    if (ls) {
      ls.setItem('cart', JSON.stringify(cartProducts))
    }
  }

  function addToCart(product, size = null, extras = []) {
    setCartProducts(prevProducts => {
      const newProduct = { ...product, size, extras }
      const allProducts = [...prevProducts, newProduct]
      saveCartProductsToLocalStorage(allProducts)
      return allProducts
    })
  }

  function clearCart() {
    setCartProducts([])
    saveCartProductsToLocalStorage([])
    toast.success('Carrello svuotato con successo.')
  }

  function removeCartItem(indexToRemove) {
    setCartProducts(prevCartProducts => {
      const cartProductsAtt = prevCartProducts.filter(
        (product, i) => i !== indexToRemove
      )
      saveCartProductsToLocalStorage(cartProductsAtt)
      return cartProductsAtt
    })
    toast.success('Il prodotto è stato rimosso dal carrello.')

  }



  return (
    <SessionProvider>
      <CartContext.Provider value={{
        cartProducts, setCartProducts, addToCart,
        clearCart, removeCartItem
      }}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  )
}