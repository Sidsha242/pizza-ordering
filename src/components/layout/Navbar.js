'use client';
import Link from "next/link"
import {useSession, signOut} from "next-auth/react";
import { useContext } from "react";
import { CartContext } from "../AppContext";

export default function Navbar()
{
    const session = useSession();

    const status = session?.status;
    const userData = session.data?.user
    let userName = userData?.name || userData?.email
    if(userName && userName.includes(' '))
    {
        userName = userName.split(' ')[0]
    }
    const {cartProducts} = useContext(CartContext)
    return (
        <>
           <header className="flex items-center justify-between">
                <nav className="flex items-center gap-9 text-gray-500 font-semibold">
                <Link className="text-primary font-semibold text-3xl" href="/">ST PIZZA</Link>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/menu'}>Menu</Link>
                    <Link href={'/#about'}>About</Link>
                    <Link href={'/#contact'}>Contact</Link>
                    
                </nav>
                <nav className="flex items-center gap-9 text-gray-500 font-semibold">
                    {status === 'authenticated' && (
                        <>
                        <Link href={'/profile'} className="whitespace-nowrap">
                            Hello, {userName}
                        </Link>
                        <button 
                        onClick={() => signOut()} 
                        className="bg-primary rounded-full text-white px-8 py-2">
                            Logout
                        </button>
                        </>
                    )}
                    {status === 'unauthenticated' && (
                        <>
                         <Link href={'/login'}>Login</Link>
                         <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">Regsiter</Link>
                         </>
                    )}
                    {cartProducts?.length > 0 && (
                        <Link href={'/cart'}>Cart ({cartProducts.length})</Link>
                    )}
               
                
                </nav>
            </header>
        </>
    )
}