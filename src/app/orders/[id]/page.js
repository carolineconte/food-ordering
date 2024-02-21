'use client'
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { statusClassFunc } from '@/libs/StatusClass'
//components
import { CartContext } from "@/components/AppContext";
import { SectionHeaders } from "@/components/layout/SectionHeaders";
import MenuItemTile from '@/components/menu/menuItemTile'
import UseProfile from "@/components/hooks/UseProfile";
import LoadingMsg from '@/components/LoadingMsg';
import BtnNavigate from '@/components/layout/BtnNavigate'
import UserTabs from "@/components/layout/UserTabs";
import toast from "react-hot-toast";
import Left from "@/components/icons/Left";

export default function OrderPage() {

  const { loading, data: profile } = UseProfile()
  const { clearCart } = useContext(CartContext);
  const { id } = useParams();

  const [order, setOrder] = useState(null)
  const [status, setStatus] = useState('non-iniziato');

  useEffect(() => {
    if (typeof window.console !== 'undefined') {
      if (window.location.href.includes('clear-cart=1')) {
        clearCart()
      }
    }

    if (id) {
      fetch('/api/orders?_id=' + id).then(res => {
        res.json().then(orderData => {
          setOrder(orderData)
          setStatus(orderData.status)
        })
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const statusClass = statusClassFunc(status)

  const handleChange = async (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (e, status) => {
    e.preventDefault()
    const data = { status, id };

    const res = fetch('/api/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore durante il salvataggio. Riprova più tardi.');
      }
    });

    await toast.promise(res, {
      loading: 'Caricamento in corso...',
      success: 'Le modifiche sono state salvate. ',
      error: 'Oops! C`è stato un problema, riprova più tardi.',
    });
  }

  if (loading) {
    return <LoadingMsg />
  }

  return (
    <section className=" grow md:w-3/4 mx-auto ">
      {profile.admin ? (
        <div className="mt-6 mx-auto">
          <UserTabs />
          <BtnNavigate href={'/orders'}>
          <Left />
         Ritornare alla lista degli ordini.
          </BtnNavigate> 
        </div>
      ) : (
        <>
          <SectionHeaders mainHeader={'Grazie per il tuo ordine!'}></SectionHeaders>
          <h2 className="text-center">
            Il pagamento è stato elaborato con successo.<br />
            Riceverai a breve una conferma via email.
          </h2>
        </>
      )
      }

      <div className="border-4 rounded-xl p-8 mt-6">
        <p className="text-center text-2xl ">Riepilogo dell&apos;ordine</p>
        {
          order && (
            <section>
              <div className="w-3/5 m-10">
                <p className="text-xl mb-2">Dettagli di consegna:</p>
                <p className="underline">{order.address}</p>
                <p>Citofono: {order.intercom}</p>
                <p>Contatto: {order.phone}</p>
              </div>

              <div className="mx-10">
                <p className="text-xl mb-2 underline">Prodotti:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {
                    order.cartProducts.map((item, i) => (
                      <div key={item._id + i}
                        className="border p-2 rounded-lg text-center flex flex-col">
                        <MenuItemTile item={item} />
                        {item.size && (<p>{item.size.name}</p>)}
                        {item.extras.length > 0 && (
                          <>
                            <p>Detalhes:  </p>
                            {item.extras.map(extra => (<p key={extra._id}>{extra.name}</p>))}
                          </>
                        )}
                      </div>
                    ))
                  }
                </div>
              </div>
            </section>
          )
        }
      </div>

      {profile.admin ?
        (
          <div className="p-6">
            <h2 className="text-xl my-3">
              Stato dell&apos;Ordine: {' '}
              <span className={`uppercase font-bold ${statusClass}`}>
                {status}
              </span>
            </h2>
            <form className="flex flex-col gap-2" onSubmit={(e) => handleSubmit(e, status)}>
              <label>
                <input type="radio" name="stato" value="non-iniziato" onChange={handleChange} checked={status === 'non-iniziato'} />
                Non Iniziato
              </label>

              <label>
                <input type="radio" name="stato" 
                value="in-elaborazione" 
                onChange={handleChange} checked={status === 'in-elaborazione'} />
                In Elaborazione
              </label>

              <label>
                <input type="radio" name="stato" value="elaborato" 
                onChange={handleChange} 
                checked={status === 'elaborato'} />
                Elaborato
              </label>

              <button className="border px-4 py-2 w-fit text-center rounded-lg bg-gray-100 hover:bg-gray-400" 
              type="submit" >Aggiornare lo Stato
                </button>
            </form>
          </div>
        )
        : (
          <>
            <p className="text-center mt-6"> Buon appetito e grazie per aver scelto la nostra pizzeria!</p>
            <Link className="text-primary font-semibold text-center block text-2xl m-auto" href="/">Fiorella</Link>
          </>
        )
      }
    </section >
  )
}