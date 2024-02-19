import mongoose from "mongoose"
import { User } from "@/models/User"

export async function POST(req){

  const newUser = await req.json()
  mongoose.connect(process.env.MONGOURL)

  const userCreated = await User.create(newUser)

  return Response.json(userCreated)
}

