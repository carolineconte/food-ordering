import mongoose from "mongoose";
import { User } from "@/models/User"
import { isAdmin } from '@/libs/isAdmin'

export async function GET() {

  if (await isAdmin()) {
    await mongoose.connect(process.env.MONGOURL);
    const users = await User.find()

    return Response.json(users)
  } else {
    return Response.json([])
  }

}
