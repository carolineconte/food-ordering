'use client'
import { useEffect, useState } from "react";
import { formatTime } from '@/libs/datetime';
import { statusClassFunc } from '@/libs/StatusClass';
import UseProfile from "@/components/hooks/UseProfile";
import Link from "next/link";
//components
import { SectionHeaders } from "@/components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import LoadingMsg from '@/components/LoadingMsg';

export default function OrdersPage() {

  const { loading, data: profile } = UseProfile()
  const [orders, setOrders] = useState()

  useEffect(() => {
    fetch('/api/orders').then(res => {
      res.json().then(orders => {
        setOrders(orders.reverse())
      })
    })
  }, [])

  if (loading) {
    return <LoadingMsg />
  }

  return (
    <section className="grow my-12 mx-auto">
      {profile.admin ? <UserTabs /> : <SectionHeaders mainHeader={'I Tuoi Ordini'} />}

      <div>
        {orders?.length > 0 && (
          orders.map((order,i) => (
            <div key={order._id}
              className="bg-gray-200 mb-2 p-4 gap-4 rounded-lg grid md:grid-cols-[auto_250px_130px_150px] items-center"  >
              <div>
                <p>Ordine n: <span className="underline">{Number((order._id).substring(0, 2)) + (10 - i)}</span> </p>
                <p>Quantità di prodotti: {order.cartProducts.length}</p>
              </div>
              <div className="flex gap-5 items-center justify-center">
                <p className={(order.paid ? 'text-green-600 bg-green-200/30' : 'text-red-600 bg-red-200/30') + ' font-bold text-center rounded-lg px-2'}>
                  {order.paid ? <span>Pagato</span> : <span>Non Pagato</span>}
                </p>

                <p className={(statusClassFunc(order.status)) + ' font-bold text-center rounded-lg'}>
                  <span>{order.status}</span>
                </p>
              </div>
              <p className="md:text-right">{formatTime(order.createdAt)}</p>
              <Link className="border cursor-pointer p-2 rounded-lg text-center bg-white hover:bg-white/50"
                href={'/orders/' + order._id}>Guarda i detagli</Link>
            </div>
          ))
        )}
      </div>
    </section>
  )
}