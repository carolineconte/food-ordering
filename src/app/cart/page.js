'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext";
import CloseIcon from "@/components/icons/CloseIcon";
import { SectionHeaders } from "@/components/layout/SectionHeaders";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import UseProfile from '../../components/hooks/UseProfile';
import toast from "react-hot-toast";
import LoadingMsg from '@/components/LoadingMsg'

export default function CartPge() {

  const { data: profileData, loading } = UseProfile()
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Mi dispiace, il pagamento è stato rifiutato.')
      }
    }
  }, [])

  useEffect(() => {
    if (profileData?.city) {
      const { phone, address, city, postalCode, name } = profileData
      const addresFromProfile = { phone, address, city, postalCode, name }
      setUser(addresFromProfile)
    }
  }, [profileData])

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [intercom, setIntercom] = useState('')

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
      setCity(user.city || '');
      setPostalCode(user.postalCode || '');
    }
  }, [user])

  const { cartProducts, clearCart, removeCartItem } = useContext(CartContext);
  //calculo valor final
  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p)
  }

  async function proceedToCheckout(e) {
    e.preventDefault()

    const userAddress = {
      name,
      phone,
      address,
      city,
      postalCode,
      intercom
    }
    try {
      //address and shopping cart products
      const savingPromise = fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userAddress,
          cartProducts,
        })
      }).then(async res => {
        if (!res.ok) {
          throw new Error(res.error);
        } else {
          const link = await res.json()
          // redirect to stripe
          window.location = link;
        }
      })
      await toast.promise(savingPromise, {
        loading: 'Attendere prego...',
        success: 'Verrai reindirizzato alla pagina di conferma.',
        error: 'Si è verificato un errore durante l\'elaborazione del pagamento. Si prega di riprovare più tardi.',
      });

    } catch (e) {
      console.log(e)
    }
  }

  if (loading) {
    return <LoadingMsg />
  }

  if (cartProducts?.length === 0) {
    return (
      <section className='h-[75vh] w-1/2 mx-auto px-4 flex items-center text-center'>
        <p>
          Benvenuto nel tuo carrello! Aggiungi le nostre gustose pizze
          e gli accompagnamenti per creare il tuo pasto perfetto!
        </p>
      </section>
    )
  }

  return (
    <section className=' mx-auto w-full px-4'>
      <SectionHeaders mainHeader={'Il tuo ordine'} subHeader={`${cartProducts.length} ${cartProducts.length > 1 ? 'prodotti' : 'prodotto'}`} />
      <div className="md:grid grid-cols-2 gap-4 my-6">
        <div className="grow">

          {cartProducts.map((product, i) => (
            <section key={i} className="flex gap-3 border-b p-2 items-center">
              <div className="rounded-full">
                <Image src={product.image} width={100} height={100} priority={true} alt="prodoto" />
              </div>
              <div className="grow">
                <h2 className="text-lg flex justify-between">
                  {product.name}
                  <span className="text-xl font-bold">{(cartProductPrice(product)).toFixed(2)}€</span>
                </h2>
                {product.size && <p className="text-gray-600 text-sm">{product.size.name}</p>}
                {product?.extras?.length > 0 && (
                  product?.extras?.map((extra, i) => (
                    <div key={i} className="flex gap-2 px-1">
                      <p>{extra.name}</p>
                      <p className="text-secondary font-semibold">+{extra.price}€</p>
                    </div>))
                )}
              </div>

              <button onClick={() => removeCartItem(i)}
                className='transition-all text-white p-2 bg-primaryHover rounded-full hover:scale-110'>
                <CloseIcon className="w-3 h-3" />
              </button>
            </section>
          ))}

          <div className="border-b p-4 text-xl text-right font-semibold">
            Total: {(total).toFixed(2)} €
          </div>

          <button type="button" onClick={clearCart}
            className="btn block my-3 bg-primary text-white">
            Elimina tudo
          </button>

        </div>

        <div className="grow bg-gray-100 rounded-lg p-4">
          <h2>Dettagli di consegna</h2>

          <form className='flex grow flex-col justify-center gap-2' onSubmit={(e) => onSave(e, userData)}>
            <label className='label'>
              <span className="text-sm text-gray-600">Nome </span>
              <input className='input text-black' type="text" placeholder='Nome e Cognome'
                value={name} onChange={e => setName(e.target.value)} required />
            </label>

            <label className='label'><span className="text-sm text-gray-600">Numero telefono:</span>
              <input className='input text-black' type="tel" placeholder='Telefone'
                value={phone} onChange={e => setPhone(e.target.value)} required />
            </label>

            <label className='label'><span className="text-sm text-gray-600">Indirrizzo:</span>
              <input className='input text-black' type="text" placeholder='Via, num civico'
                value={address} onChange={e => setAddress(e.target.value)} required />
            </label>

            <div className='flex gap-2'>
              <label className='label'><span className="text-sm text-gray-600">Citta:</span>
                <input className='input text-black' type="text" placeholder='Citta'
                  value={city} onChange={e => setCity(e.target.value)} required />
              </label>

              <label className='label'><span className="text-sm text-gray-600">CAP:</span>
                <input className='input text-black' type="text" placeholder='CAP'
                  value={postalCode} onChange={e => setPostalCode(e.target.value)} required />
              </label>
            </div>
            <label className='label'><span className="text-sm text-gray-600">Citofono:</span>
              <input className='input text-black' type="text" placeholder='Citofono'
                value={intercom} onChange={e => setIntercom(e.target.value)} required />
            </label>
            <div className="my-3 border-t p-3">
              <p>Riepilogo:</p>
              <p className="text-md text-gray-600">Prodotto {(total).toFixed(2)} €</p>
              <p className="text-md text-gray-600">Consegna 5.00 € </p>
            </div>
            <button type="submit" onClick={proceedToCheckout}
              className="btn border-2 bg-secondary text-white">
              Ordinane a {(total + 5).toFixed(2)} €
            </button>
          </form>

        </div>
      </div>
    </section >
  )
}