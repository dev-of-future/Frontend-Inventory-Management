import React from 'react'

const PurchaseOrderBody = ({ purchaseOrder, editStatus, openEditItemsModal, editStore, deletePurchaseOrder }: any) => {
  const lastUpdated = purchaseOrder.lastUpdated ? new Date(purchaseOrder.lastUpdated).toLocaleDateString() : ''

  return (
    <tr key={purchaseOrder.id}>
      <td className="cursor-pointer text-left px-2 py-3 overflow-x-scroll">
        <span className="text-sm text-gray-500">
          {purchaseOrder.id}
        </span>
      </td>
      <td className="text-left px-2 py-3 whitespace-nowrap">
        <span className="text-sm text-gray-500 flex gap-1">{purchaseOrder.status}
          <svg onClick={editStatus} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-5 hover:fill-[#60a5fa] cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </span>
      </td>
      <td className="text-left px-2 py-3 whitespace-nowrap">
        <span className="text-sm text-gray-500">{purchaseOrder.totalPrice}</span>
      </td>
      <td className="text-left px-2 py-3 whitespace-nowrap">
        <span className="text-sm text-gray-500">{purchaseOrder.totalQuantity}</span>
      </td>

      <td className="text-left px-2 py-3 whitespace-nowrap">
        <span className="text-sm text-gray-500 flex gap-1">{purchaseOrder.store.name}
          <svg onClick={editStore} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-5 hover:fill-[#60a5fa] cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </span>
      </td>
      <td className="text-left px-2 py-3 whitespace-nowrap">
        <span className="text-sm text-gray-500">{lastUpdated}</span>
      </td>

      <td className="text-right px-2 py-3 whitespace-nowrap flex gap-2">
        <svg onClick={openEditItemsModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:fill-[#60a5fa] cursor-pointer">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <svg onClick={deletePurchaseOrder} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:fill-[#e11d48] cursor-pointer">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </td>
    </tr>
  );
}

export default PurchaseOrderBody