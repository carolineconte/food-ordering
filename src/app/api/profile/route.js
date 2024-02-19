import mongoose from "mongoose";
import { User } from "@/models/User"
import { getServerSession } from "next-auth";
import { authOptions } from '../../../libs/auth'
import { UserInfo } from "@/models/UserInfo";

export async function PUT(req) {
  try {
    await mongoose.connect(process.env.MONGOURL);

    const data = await req.json();

    const { _id, name, image, ...otherUserInfo } = data;

    let filter = {};

    if (_id) {
      filter = { _id }
    } else {
      const session = await getServerSession(authOptions)
      const email = session.user.email
      filter = { email }
    }
    const user = await User.findOne(filter)
    await User.updateOne(filter, { name, image })
    //Procura o usuario e atualiza, mas se nao existe cria um novo(upsert)
    await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, { upsert: true })

    return Response.json(true)

  } catch (error) {
    console.error("Erro durante a manipulação da requisição PUT:", error);
  }
}

export async function GET(req) {
  mongoose.connect(process.env.MONGOURL)

  const url = new URL(req.url);
  const _id = url.searchParams.get('_id')

  let filterUser = {};

  if (_id) {
    filterUser = { _id };
  } else {
    //Utilizar as credenciais para acessar email da sessao
    const session = await getServerSession(authOptions)
    const email = session?.user?.email

    if (!email) {
      return Response.json({})
    }
    filterUser = { email };
  }

  //.lean() - descarta informacoes extras, retornando somento o que esta dentro de document
  const user = await User.findOne(filterUser).lean();
  const userInfo = await UserInfo.findOne({ email: user.email }).lean();

  return Response.json(
    { ...user, ...userInfo }
  )

}