import { Category } from "@/models/Category"
import mongoose from "mongoose";
import { isAdmin } from '@/libs/isAdmin'

export async function POST(req) {
  mongoose.connect(process.env.MONGOURL)
  const { name } = await req.json();
  if (await isAdmin()) {
    const categoryDoc = await Category.create({ name })
    return Response.json(categoryDoc)
  }
  return Response.json([])
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGOURL)
  const { _id, name } = await req.json()
  if (await isAdmin()) {
    //Primeiro parametro o que usar para identificar o el a ser modificado e o sugundo o que sera modificado
    await Category.updateOne({ _id }, { name })
  }
  return Response.json(true)
}

export async function GET() {
  await mongoose.connect(process.env.MONGOURL)
  return Response.json(
    await Category.find()
  )
}

export async function DELETE(req) {
  await mongoose.connect(process.env.MONGOURL);
  const url = new URL(req.url)
  const _id = url.searchParams.get('_id')
  if (await isAdmin()) {
    await Category.deleteOne({ _id })
  }
  return Response.json(true)
}


