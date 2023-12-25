'use client';
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useAdmin} from "../../components/UseAdmin"

export default function UsersPage() {

  const [users, setUsers] = useState([]);

  const {loading:profileLoading,data:profileData} = useAdmin();


  useEffect(() => {
    fetch('/api/users').then(response => {
      response.json().then(users => {
        setUsers(users);
      });
    })
  }, []);

  if(profileLoading)
  {
    return 'Loading info'
  }
  if(!profileData.admin)
  {
    return 'Not an admin';
  }


  return (
    <section className="max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {users?.length > 0 && users.map(user => (
          <div
            key={user._id}
            className="bg-gray-100 rounded-lg mb-2 p-4 px-4 flex items-center gap-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
              <div className="text-gray-900">
                {!!user.name && (<span>{user.name}</span>)}
                {!user.name && (<span className="italic">No name</span>)}
              </div>
              <span className="text-gray-500">{user.email}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}