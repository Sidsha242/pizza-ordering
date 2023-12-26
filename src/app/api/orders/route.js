
import {Order} from "../../models/Order";
import mongoose from "mongoose";

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);
  return Response.json( await Order.find() );
}