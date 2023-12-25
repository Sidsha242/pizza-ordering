import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import * as mongoose from "mongoose";
import bcrypt from "bcrypt";
import {User} from "../../../models/User"
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect"


export const authOptions = {
  session: {strategy:'jwt',
    maxAge: 1000},
  secret: process.env.SECRET,
  callbacks: {
    jwt({token, trigger,session}) {
    if(trigger === "update" && session?.name) {
      token.name = session.name
    }
    return token
    }
  },
  adapter: MongoDBAdapter(clientPromise), //keeps session in MongoDB
  providers:[
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
        type:'credentials',
        name: 'Credentials',
        credentials: {
          username: { label: "Email", type: "email", placeholder: "test@example.com" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) 
        {
          const email = credentials?.email;
          const password = credentials?.password;

          console.log(email);
          console.log(password);
          
          mongoose.connect(process.env.MONGO_URL);
          const user = await User.findOne({email});
          console.log(user.password);
          const passwordOk = user && bcrypt.compare(password, user.password);

          console.log(bcrypt.compareSync(password, user.password));

          
          if (passwordOk) 
          {
            console.log(user);
            return user;
          }
          
          return null
        }
      })
  ]
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }