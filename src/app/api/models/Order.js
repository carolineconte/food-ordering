import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  userEmail: String,
  name: String,
  intercom: String,
  phone: String,
  address: String,
  postalCode: String,
  city: String,
  country: String,
  cartProducts: Object,
  status: { type: String, default: 'non-iniziato' },
  paid: { type: Boolean, default: false }
}, { timestamps: true })

export const Order = models?.Order || model('Order', OrderSchema)