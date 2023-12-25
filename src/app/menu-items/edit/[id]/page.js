'use client';
import DeleteButton from "@/components/DeleteButton";
import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";

import {useAdmin} from "../../../../components/UseAdmin"

import Link from "next/link";
import {redirect, useParams} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function EditMenuItemPage() {

  const {id} = useParams(); //IMPORTANT

  const [image,setImage] = useState('');
  const [name,setName] = useState('');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState('');

  const {loading:profileLoading,data:profileData} = useAdmin();

  const [categories, setCategories] = useState([]);
  const [category,setCategory] = useState('');


  const [redirectToItems, setRedirectToItems] = useState(false); //once clicked on save we should go back to list cannot directly redirect must have state

  useEffect(() => {
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
        setCategory(categories[0]._id); //to give first value ..first value was not loading
      });
    });
    fetch('/api/menu-items').then(res => {
        res.json().then(items => {
            const item = items.find(i => i._id === id);
            setImage(item.image);
            setName(item.name);
            setDescription(item.description);
            setBasePrice(item.basePrice);
            setCategory(item.category);
        }
        )
    })
  },[])

  async function handleFormSubmit(ev)
  {
    ev.preventDefault();
    const data = { image, name, description, basePrice, _id:id, category};
    console.log(data);
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menu-items', {
        method: 'PUT',
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

  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch('/api/menu-items?_id='+id, {
        method: 'DELETE',
      });
      if (res.ok)
        resolve();
      else
        reject();
    });

    await toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted',
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
        <div className="flex items-start gap-4">
          <div className="h-36 w-36">
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
            <select value={category} onChange={ev=> setCategory(ev.target.value)}>
                {categories?.length > 0 && categories.map(c => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            <button type="submit">Save</button>
            <div className="mt-5">
            <DeleteButton
            label="Delete this menu item"
            onDelete={handleDeleteClick}
          />
          </div>
          </div>
        </div>
      </form>
    </section>
  );

}