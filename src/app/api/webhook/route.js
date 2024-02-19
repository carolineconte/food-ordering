import { Order } from '@/models/Order';

const stripe = require('stripe')(process.env.STRIPE_SK)

export async function POST(req) {
  const sig = req.headers.get('stripe-signature')
  let event;

  try {
    const reqBuffer = await req.text();
    const signSecret = process.env.STRIPE_SIGIN;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret)

  } catch (e) {
    console.log(e)
    return Response.json(`Webhook Error: ${e.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    console.log(event)
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === 'paid';
    if (isPaid) {
      await Order.updateOne({ _id: orderId }, { paid: true });
    }
  }

  return Response.json('ok', { status: 200 })
}