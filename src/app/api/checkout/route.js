import { Order } from "../../models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
  
    const {cartProducts} = await req.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
  
    const orderDoc = await Order.create({
      userEmail,
      cartProducts,
    })

    return Response.json(orderDoc)

}