import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from '../../../libs/auth'
import { Order } from "@/models/Order"
import { isAdmin } from '@/libs/isAdmin'


export async function GET(req) {
  mongoose.connect(process.env.MONGOURL)

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const admin = await isAdmin();

  const url = new URL(req.url)
  const _id = url.searchParams.get('_id')

  if (_id) {
    return Response.json(await Order.findById(_id))
  }

  if (admin) {
    return Response.json(await Order.find())
  }

  if (userEmail) {
    return Response.json(await Order.find({ userEmail }))
  }
}

export async function PUT(req) {
  try {
    const data = await req.json();

    const { id, status } = data

    // Atualiza o documento na coleção 'Order' com o _id fornecido, definindo o novo status
    await Order.findByIdAndUpdate(id, {'status':status});

    return Response.json(true) // Retorna uma resposta indicando sucesso
  } catch (error) {
    console.error("Erro durante a manipulação da requisição PUT:", error);
  }
}