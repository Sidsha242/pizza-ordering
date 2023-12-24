'use client';
import Link from "next/link"
import {useSession, signOut} from "next-auth/react";

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
    return (
        <>
           <header className="flex items-center justify-between">
                <nav className="flex items-center gap-9 text-gray-500 font-semibold">
                <Link className="text-primary font-semibold text-3xl" href="/">ST PIZZA</Link>
                    <Link href={'/'}>Home</Link>
                    <Link href={''}>Menu</Link>
                    <Link href={''}>About</Link>
                    <Link href={''}>Contact</Link>
                    
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
               
                
                </nav>
            </header>
        </>
    )
}