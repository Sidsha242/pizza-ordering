'use client';
import CartProduct from "../../components/menu/CartProduct";
import {CartContext, cartProductPrice} from "@/components/AppContext";
import SectionHeaders from "../../components/layout/SectionHeader"
import { useContext } from "react";
import {useSession} from 'next-auth/react'
import { redirect } from 'next/navigation';
import Link from "next/link";
import Right from "@/components/icons/Right";
import toast from "react-hot-toast";

export default function CartPage() {

    const {cartProducts,removeCartProduct,clearCart} = useContext(CartContext);
    const {data: session, status, update } = useSession();
    console.log(session);

    let subtotal = 0;
    for (const p of cartProducts) {
      subtotal += p.basePrice;
    }

    async function proceedToCheckout(ev) {
      // address and shopping cart products
  
      const promise = new Promise((resolve, reject) => {
        fetch('/api/checkout', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            //address,
            cartProducts,
          }),
        }).then(async (response) => {
          if (response.ok) {
            resolve();
            clearCart();
          } else {
            reject();
          }
        });
      });
  
      await toast.promise(promise, {
        loading: 'Preparing your order...',
        success: 'Redirecting to payment...',
        error: 'Something went wrong... Please try again later',
      })
    }
  
    if (cartProducts?.length === 0) {
      return (
        <section className="mt-8 text-center">
          <SectionHeaders mainHeader="Cart" />
          <p className="mt-4">Your shopping cart is empty..</p>
        </section>
      );
    }

    if (cartProducts?.length === 0) {
        return (
          <section className="mt-8 text-center">
            <SectionHeaders mainHeader="Cart" />
            <p className="mt-4">Your shopping cart is empty</p>
          </section>
        );
      }

      if (status === 'unauthenticated')
      {
         return redirect('/login');
      }

    return(
        <section className="mt-8">
        <div className="text-center">
          <SectionHeaders mainHeader="Cart" />
        </div>
        <div className="mt-8 grid gap-8 grid-cols-2">
          <div>
            {cartProducts?.length === 0 && (
              <div>No products in your shopping cart</div>
            )}
            {cartProducts?.length > 0 && cartProducts.map((product, index) => (
              <CartProduct
                index = {index}
                product={product}
                onRemove={removeCartProduct}
              />
            ))}
            </div>
            <div className="ml-5">
            <Link className="flex items-center border-2 rounded-md p-3 gap-2 py-2  text-gray-600 font-semibold" href={'/profile'}>
              For delivery address visit Profile
              <Right />
            </Link>
            <div className="py-2 pr-16 mt-5 mb-5 flex items-center">
            <div className="text-gray-500">
              Subtotal:<br />
              Delivery:<br />
              Total:
            </div>
            <div className="font-semibold pl-2 text-right">
            ₹{subtotal}<br />
            ₹25<br />
            ₹{subtotal + 25}
            </div>
        </div>
        <button type="submit" onClick={() => proceedToCheckout()}>Pay  ₹{subtotal+5}</button>
        </div>
        </div>       
        </section>

    )

}