'use client'
import {useState} from "react";
import Link from "next/link";
import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage"
import UserTabs from "@/components/layout/UserTabs";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

import {useAdmin} from "../../../components/UseAdmin"


export default function NewMenuItemPage() {

  const [image,setImage] = useState('');
  const [name,setName] = useState('');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState('');

  const {loading:profileLoading,data:profileData} = useAdmin();


  const [redirectToItems, setRedirectToItems] = useState(false); //once clicked on save we should go back to list cannot directly redirect must have state

  async function handleFormSubmit(ev)
  {
    ev.preventDefault();
    const data = { image, name, description, basePrice};
    console.log(data);
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menu-items', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type' : 'application/json'},
      });
      console.log(response);
      if (response.ok) {
        resolve();
      }
      else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
        loading: 'Saving Menu Item',
        success: 'Saved',
        error: 'Error',
    });
    
    setRedirectToItems(true);
  }

  if(redirectToItems)
  {
    return redirect('/menu-items');
  }
  
  if(profileLoading)
  {
    return 'Loading info'
  }
  if(!profileData.admin)
  {
    return 'Not an admin';
  }

  return(
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-md mx-auto mt-8">
        <Link href={'/menu-items'} className="button">
        <Left />
          <span>Show Menu Items</span>
        </Link>
      </div>
      <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
        <div className="flex items-start gap-4" style={{gridTemplateColumns:'0.3fr 0.7fr'}}>
          <div>
                <EditableImage link={image} setLink={setImage} />
          </div>
          <div className="grow">
            <label>Item Name</label>
            <input 
              type="text"
              value={name}
              onChange={ev => setName(ev.target.value)}
              />
            <label>Description</label>
            <input 
              type="text"
              value={description}
              onChange={ev => setDescription(ev.target.value)}
              />
            <label>Base Price</label>
            <input 
              type="text"
              value={basePrice}
              onChange={ev => setBasePrice(ev.target.value)}
              />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  );

  
}