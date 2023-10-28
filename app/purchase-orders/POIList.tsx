import React from 'react'
import IPurchaseOrderItem from '../types/purchaseOrderItem.type'
import POI from './POI'

type POIListProps = {
  purchaseOrderItems: IPurchaseOrderItem[];
  deletePOI: (id: number) => void;
}

const POIList = ({ purchaseOrderItems, deletePOI }: POIListProps) => {
  return (
    <>
      <div className="my-8 overflow-x-auto">
        <div className="flex shadow border-b">
          <table className="min-w-full table">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                  ID
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                  NAME
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                  PRICE
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                  QUANTITY
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                  TOTAL
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                  CATEGORY
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                  SUPPLIER
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {purchaseOrderItems.map((item: IPurchaseOrderItem) => (
                item.id !== undefined ? (
                  <POI
                    poItem={item}
                    key={item.id}
                    deletePOI={() => deletePOI(item.id as number)}
                  />
                ) : null
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default POIList
