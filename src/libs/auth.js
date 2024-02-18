
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./mongoconnect"
import { User } from '@/models/User'
import bcrypt from 'bcrypt'
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const email = credentials?.email
        const password = credentials?.password
       
        mongoose.connect(process.env.MONGOURL)
        const user = await User.findOne({ email })
        const passwordConf = bcrypt.compareSync(password, user.password)
        
        if (passwordConf) {
          return user
        }

        return null
      }
    })
  ]
}

const handler = NextAuth(authOptions)

export default handler