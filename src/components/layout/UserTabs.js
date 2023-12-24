'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function UserTabs({isAdmin}) {
  const path = usePathname(); //to find which path is active
  return (
    <div className="flex font-semibold mx-auto gap-2 tabs justify-center flex-wrap mb-8">
      <Link 
      className={path === '/profile' ? 'active' : ''} 
      href={'/profile'}>
      Profile
      </Link>
                {isAdmin && (
                    <>
                        <Link   className={path === '/categories' ? 'active' : ''} href={'/categories'}>Categories</Link>
                        <Link   className={path.includes('menu-items') ? 'active' : ''} href={'/menu-items'}>Menu Items</Link>
                        <Link   className={path === '/users' ? 'active' : ''}  href={'/users'}>Users</Link>
                    </>
                )}
    </div>
  );
}