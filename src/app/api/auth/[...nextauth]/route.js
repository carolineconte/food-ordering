import mongoose from "mongoose"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from '@/models/User'
import bcrypt from 'bcrypt'

import {authOptions} from '@/libs/auth'

import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../../libs/mongoconnect"

// export const authOptions = {
//   secret: process.env.SECRET,
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       id: 'credentials',
//       credentials: {
//         username: { label: "Email", type: "email", placeholder: "test@example.com" },
//         password: { label: "Password", type: "password" }
//       },

//       async authorize(credentials, req) {

//         const email = credentials?.email
//         const password = credentials?.password
       
//         mongoose.connect(process.env.MONGOURL)
//         //encontrar o usuario
//         const user = await User.findOne({ email })
//         //comparar a senha criptografada
//         const passwordConf = bcrypt.compareSync(password, user.password)
        
//         if (passwordConf) {
//           return user
//         }

//         return null
//       }
//     })
//   ]
// }

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}