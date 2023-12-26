'use client';
import UserTabs from "@/components/layout/UserTabs";
import {useAdmin} from "../../components/UseAdmin"
import {dbTimeForHuman} from "@/libs/datetime";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const {loading, data:profile} = useAdmin();

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    setLoadingOrders(true);
    fetch('/api/orders').then(res => {
      res.json().then(orders => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      })
    })
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {loadingOrders && (
          <div>Loading orders...</div>
        )}
        {orders?.length > 0 && orders.map(order => (
          <div
            key={order._id}
            className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6">
            <div className="grow flex flex-col md:flex-row items-center gap-6">
              <div className="grow">
                <div className="flex gap-2 items-center mb-1">
                  <div className="grow">{order.userEmail}</div>
                  <div className="text-gray-500 text-sm">{dbTimeForHuman(order.createdAt)}</div>
                </div>
                <div className="text-gray-500 text-xs">
                  {order.cartProducts.map(p => p.name).join(', ')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}