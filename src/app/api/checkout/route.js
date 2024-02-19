import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from '../../../libs/auth'
import { Order } from "@/models/Order.js";
import { MenuItem } from "@/models/MenuItem.js";
const stripe = require('stripe')(process.env.STRIPE_SK)

export async function POST(req) {
  mongoose.connect(process.env.MONGOURL)

  const { userAddress, cartProducts } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email

  const orderDoc = await Order.create({
    userEmail,
    ...userAddress,
    cartProducts,
    paid: false,
  })

  const stripeLineItems = []
  //config de cada prod em cartProducts
  for (const cartProduct of cartProducts) {

    const productInfo = await MenuItem.findById(cartProduct._id)

    let productPrice = productInfo.basePrice;
    if (cartProduct.size) {
      const size = productInfo.sizes
        .find(size => size._id.toString() === cartProduct.size._id.toString());
      productPrice += size.price
    }

    if (cartProduct.extras?.length > 0) {
      //pega cada extra no carrinho
      for (const cartProductExtra of cartProduct.extras) {
        //pega os ingrdientes extras no produdo encontrado no bd
        const extraThingInfo = productInfo.extraIngredients
          //encontra o que esta no carrinho e adiciona o preco
          .find(extra => extra._id.toString() === cartProductExtra._id.toString())
        productPrice += extraThingInfo.price
      }
    }

    const productName = cartProduct.name

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: 'EUR',
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100,
      }
    })
  }



  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: 'payment',
    customer_email: userEmail,
    success_url: process.env.NEXTAUTH_URL + 'orders/' + orderDoc._id.toString() + '?clear-cart=1',
    cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
    metadata: { orderId: orderDoc._id.toString() },
    payment_intent_data: {
      metadata: { orderId: orderDoc._id.toString() },
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'Delivery fee',
          type: 'fixed_amount',
          fixed_amount: { amount: 500, currency: 'EUR' },//VALOR DA TAXA DE DELIVERY EM CENTAVOS
        }
      }
    ]
  })
  return Response.json(stripeSession.url)
}