'use client';
import {useSession} from 'next-auth/react'
import { redirect } from 'next/navigation';
import {useState,useEffect} from "react";
import toast from 'react-hot-toast';
import Link from 'next/link';
import UserTabs from '@/components/layout/UserTabs'
import EditableImage from '@/components/layout/EditableImage';

export default function ProfilePage()
{
    const {data: session, status, update } = useSession();
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('')
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState();

    const [phone, setPhone] = useState();
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);

 

    useEffect(() => {
        if(status === 'authenticated')
        {
            setUserName(session.user.name);
            setUserImage(session.user.image);
            const response =  fetch('/api/profile').then(response => {
                response.json().then(data => {
                  console.log(data);
                  setPhone(data.phone);
                  setStreetAddress(data.streetAddress);
                  setPostalCode(data.postalCode);
                  setCity(data.city);
                  setCountry(data.country);
                  setIsAdmin(data.admin);
                  setProfileFetched(true);
                })
            })
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(ev)
    {
        update({name: userName, image: userImage});
        ev.preventDefault();
        setSaved(false);
        const response = await fetch('/api/profile',{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: userName,
                image: userImage,
                phone,
                streetAddress,
                postalCode,
                city,
                country,
            }),
        })
        if(response.ok)
        {
            setSaved(true);
        }
    }

    if(status === 'loading' || !profileFetched )
    {
        return 'Loading...'
    }
    if (status === 'unauthenticated')
    {
       return redirect('/login');
    }

    return(
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin}/>
             <h1 className="text-center text-primary text-4xl mb-4">
                Profile
             </h1>
             <div className='max-w-lg mx-auto'>
                {saved && (
                     <h2 className='text-center bg-green-200 rounded-lg p-4 mb-2'>
                     Profile saved!
                 </h2>
                )}
                <div className='flex gap-4'>
                    <div>
                        <div className='p-2 relative rounded-lg max-w-[200px]'>
                            <EditableImage link={userImage}  setLink={setUserImage}/>
                        </div>
                    </div>
                    <form className='grow font-medium' onSubmit={handleProfileInfoUpdate}>
                        <label>First and Last Name</label>
                        <input type="text" placeholder='First and last name'
                        value={userName} onChange={ev => setUserName(ev.target.value)}></input>
                        <label>Email</label>
                        <input type="email" disabled={true} value={session?.user?.email}></input>
                        <label>Phone</label>
                        <input
                      
                        type="tel" placeholder="Phone number"
                        value={phone} onChange={ev => setPhone(ev.target.value)} />
                        <label>Street address</label>
                        <input
                       
                        type="text" placeholder="Street address"
                        value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)}
                        />
                        <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label>Postal code</label>
                            <input
                            type="text" placeholder="Postal code"
                            value={postalCode } onChange={ev => setPostalCode(ev.target.value)}
                            />
                        </div>
                        <div>
                            <label>City</label>
                            <input
                           
                            type="text" placeholder="City"
                            value={city} onChange={ev => setCity(ev.target.value)}
                            />
                        </div>
                        </div>
                        <label>Country</label>
                        <input
                      
                        type="text" placeholder="Country"
                        value={country} onChange={ev => setCountry(ev.target.value)}
                        />
                        <button type="submit">Save</button>
                    </form>
                  
                </div>
             </div>
        </section>
    )
}