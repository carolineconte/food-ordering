import mongoose, { Schema, model, models } from "mongoose";

const ExtrasSchema = new Schema({
  name: String,
  price: Number
})

const MenuItemSchema = new Schema({
  image: { type: String },
  name: { type: String },
  description: { type: String },
  categorie: { type: mongoose.Types.ObjectId },
  basePrice: { type: Number },
  highlight: { type: Boolean },
  sizes: { type: [ExtrasSchema] },
  extraIngredients: { type: [ExtrasSchema] },
}, { timestamps: true })

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);