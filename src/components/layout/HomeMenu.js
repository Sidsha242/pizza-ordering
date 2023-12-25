'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import MenuItem from "@/components/menu/MenuItem"
export default function HomeMenu()
{
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
            fetch('/api/menu-items').then(res => {
                res.json().then(menuItems => {
                    setBestSellers(menuItems.slice(-3));
                })
            })
    },[])

    return(
            <section>
                <div className="absolute left-0 right-0 w-full justify-start">
                    <div className="absolute left-0 -top-[70px] text-left -z-10">
                    <Image src={'/sallad1.png'} width={109} height={189}  alt={'sallad'} />
                    </div>
                    <div className="absolute -top-[100px] right-0 -z-10">
                    <Image src={'/sallad2.png'} width={107} height={195} alt={'sallad'} />
                    </div>
                </div>
                <div className="text-center">
                    <h3 className="uppercase text-gray-600">Check out</h3>
                    <h2 className="text-primary font-bold text-4xl italic">Our Best Sellers</h2>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-5">
                {bestSellers?.length > 0 && bestSellers.map(item => (
                    <MenuItem key={item._id} {...item} />
                    ))}
                </div>
            </section>

    );

}