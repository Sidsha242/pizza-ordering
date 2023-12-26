'use client';
import {SessionProvider} from "next-auth/react";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({})

export default function AppProvider({children})
{
    const [cartProducts, setCartProducts] = useState([]);

    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    useEffect(() => {
      if (ls && ls.getItem('cart')) {
        setCartProducts( JSON.parse( ls.getItem('cart') ) );
      }
    }, []);

    function clearCart() {
        setCartProducts([]);
        saveCartProductsToLocalStorage([]);
      }
    
      function removeCartProduct(indexToRemove) {
        console.log("Removing from cart" + indexToRemove);
        setCartProducts(prevCartProducts => {
          const newCartProducts = prevCartProducts
            .filter((v,index) => index !== indexToRemove);
          saveCartProductsToLocalStorage(newCartProducts);
          console.log(newCartProducts);
          return newCartProducts;
        });
        toast.success('Product removed');
      }

    function saveCartProductsToLocalStorage(cartProducts) {
        if (ls) {
          ls.setItem('cart', JSON.stringify(cartProducts));
        }
      }

    function addToCart(product)
    {
            console.log(product);
            toast.success('Product added');
            setCartProducts(prevProducts => {
                const newProducts = [...prevProducts, product];
                saveCartProductsToLocalStorage(newProducts);
                return newProducts;
            })

    }
    return(
        <SessionProvider>
            <CartContext.Provider value={{
                cartProducts, setCartProducts, addToCart, removeCartProduct, clearCart
            }}>
            {children}
            </CartContext.Provider>
        </SessionProvider>
    );

}