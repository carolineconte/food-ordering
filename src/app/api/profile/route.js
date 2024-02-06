import mongoose from "mongoose";
import { User } from "../../models/User"
import { getServerSession } from "next-auth";
import { authOptions } from '../../api/auth/[...nextauth]/route.js'

export async function PUT(req) {
  try {
    await mongoose.connect(process.env.MONGOURL);

    const data = await req.json();
    const session = await getServerSession(authOptions)
    const email = session.user.email

    await User.updateOne({ email }, data)

    return Response.json(true)

  } catch (error) {
    console.error("Erro durante a manipulação da requisição PUT:", error);
  }
}

export async function GET() {
  mongoose.connect(process.env.MONGOURL)
  //Utilizar as credenciais para acessar email da sessao
  const session = await getServerSession(authOptions)
  const email = session.user.email
  return Response.json(
    await User.findOne({ email })
  )
}