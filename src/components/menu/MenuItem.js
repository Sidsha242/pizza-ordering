import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "../AppContext";

export default function MenuItem(props)
{
    const {addToCart} = useContext(CartContext)
    return(
        <div className="bg-gray-300 p-4 rounded-lg text-center hover:bg-white hover:shadow-2xl hover:shadow-black/50 transition-all">
        <Image src={props.image} alt='menu-item' width={300} height={300}/>
        <h4 className="font-semibold text-xl my-2">{props.name}</h4>
        <p className="text-gray-500 text-sm">
           {props.description}
        </p>
        <button className="mt-4 bg-primary text-white rounded-full px-8 py-2"
        onClick={() => addToCart(props)}>
            Add to cart ₹{props.basePrice}
        </button>
        </div>
    );

}