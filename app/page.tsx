'use client'
import React, { useState, useEffect } from 'react'
import IHomePageStats from './types/homePageStats.type';
import IItem from './types/item.type';
import StatsService from './services/stats.service';
import Link from 'next/link';
import IOrderStatus from './types/orderStatus.type';

const initialItemState: IItem = {
  name: '',
  price: 0,
  shortDescription: ''
}

const initialState: IHomePageStats = {
  totalStores: 0,
  totalInventories: 0,
  totalPurchaseOrders: 0,
  totalItems: 0,

  pendingPurchaseOrders: 0,
  deliveredPurchaseOrders: 0,

  inventoriesAtThreshold: 0,

  mostPopularItemInPurchaseOrders: initialItemState,
  mostPopularItemInInventory: initialItemState,
};

export default function Home() {
  const [stats, setStats] = useState(initialState);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await StatsService.getHomePageStats();
        setStats(res.data);
      } catch (error: any) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError('Unexpected error');
        }
      }
    }
    fetchStats()
  }, []);

  return (
    <main>
      <h1 className="my-6 text-1xl text-center font-bold text-gray-900 sm:text-1xl md:text-2xl">
        Welcome to Inventory Master Home 🏆
      </h1>
      <div className='mx-auto flex flex-col gap-10 bg-gray-100 p-10 pt-5 pb-20 rounded-xl shadow-xl'>
        <h4 className="text-md text-center font-semibold text-grey-600 sm:text-md md:text-lg">
          Our Stats
        </h4>
        {error && <div className="alert alert-danger mb-2">{error}</div>}
        <div className="stats stats-vertical lg:stats-horizontal shadow">
          <Link href="/stores" className='link cursor-pointer hover:text-blue-500'>
            <div className="stat">
              <div className="stat-title text-center">Total Stores</div>
              <div className="stat-value text-center">{stats.totalStores}</div>
            </div>
          </Link>
          <div className="stat">
            <div className="stat-title text-center">Total Inventories</div>
            <div className="stat-value text-center">{stats.totalInventories}</div>
          </div>
          <Link href="/items" className='link cursor-pointer hover:text-blue-500'>
            <div className="stat">
              <div className="stat-title text-center">Total Items</div>
              <div className="stat-value text-center">{stats.totalItems}</div>
            </div>
          </Link>
          <Link href="/purchase-orders" className='link cursor-pointer hover:text-blue-500'>
            <div className="stat">
              <div className="stat-title text-center">Total Purchase Orders</div>
              <div className="stat-value text-center">{stats.totalPurchaseOrders}</div>
            </div>
          </Link>
        </div>

        <div className="stats max-w-sm shadow bg-red-400 mx-auto">
          <div className="stat">
            <div className="stat-title text-center">Inventories at Threshold</div>
            <div className="stat-value text-center">{stats.inventoriesAtThreshold}</div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className="stats bg-primary">
            <div className="stat">
              <div className="text-center flex flex-col text-black">
                <span>
                  Most Popular
                </span>
                <span>
                  In Purchase Order
                </span>
              </div>
              <div className="mt-2 stat-value flex flex-col text-sm text-white font-normal">
                <span>
                  Item: {stats.mostPopularItemInPurchaseOrders.name}
                </span>
                <span>
                  Category: {stats.mostPopularItemInPurchaseOrders.category?.name}
                </span>
                <span>
                  Supplier: {stats.mostPopularItemInPurchaseOrders.category?.supplier?.name}
                </span>
              </div>
            </div>
            <div className="stat">
              <div className="text-center flex flex-col text-black">
                <span>
                  Most Popular
                </span>
                <span>
                  In Inventory
                </span>
              </div>
              <div className="mt-2 stat-value flex flex-col text-sm text-white font-normal">
                <span>
                  Item: {stats.mostPopularItemInInventory.name}
                </span>
                <span>
                  Category: {stats.mostPopularItemInInventory.category?.name}
                </span>
                <span>
                  Supplier: {stats.mostPopularItemInInventory.category?.supplier?.name}
                </span>
              </div>
            </div>

          </div>

          <div className="stats stats-vertical lg:stats-horizontal shadow">
            <Link href={`/purchase-orders?status=${IOrderStatus.PENDING}`} className='link cursor-pointer bg-red-400 hover:text-blue-500'>
              <div className="stat bg-red-400">
                <div className="stat-title text-center flex flex-col">
                  <span>
                    Pending
                  </span>
                  <span>
                    Purchase Orders
                  </span>
                </div>
                <div className="stat-value text-center">{stats.pendingPurchaseOrders}</div>
              </div>
            </Link>
            <Link href={`/purchase-orders?status=${IOrderStatus.DELIVERED}`} className='link cursor-pointer hover:text-blue-500'>

              <div className="stat">
                <div className="stat-title text-center flex flex-col">
                  <span>
                    Delivered
                  </span>
                  <span>
                    Purchase Orders
                  </span>
                </div>
                <div className="stat-value text-center">{stats.deliveredPurchaseOrders}</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
