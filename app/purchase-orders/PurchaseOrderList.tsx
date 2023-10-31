import React, { useState, useEffect } from 'react'
import IPurchaseOrder from '../types/purchaseOrder.type'
import PurchaseOrder from './PurchaseOrder'

const PurchaseOrderList = ({
  purchaseOrders = [],
  updatePurchaseOrders
}: any
) => {
  const [orders, setOrders] = useState(purchaseOrders);

  useEffect(() => {
    setOrders(purchaseOrders)
  }, [purchaseOrders])

  return (
    <div className="my-8 overflow-x-auto">
      <div className="flex shadow border-b">
        <table className="min-w-full table">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                ID
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                STATUS
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                TOTAL PRICE
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                TOTAL QUANTITY
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                STORE
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                LAST UPDATED
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {orders?.map((purchaseOrder: IPurchaseOrder) => (
              <PurchaseOrder
                purchaseOrder={purchaseOrder}
                key={purchaseOrder.id}
                updatePurchaseOrders={updatePurchaseOrders}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PurchaseOrderList