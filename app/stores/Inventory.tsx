import React, { useState } from "react";
import IInventory from "../types/inventory.type";
import EditInventoryModal from "./EditInventoryModal";
import convertNumToPrice from "../utils/convertNumToPrice";

const Inventory = ({ inventory, updateInventories }: any) => {
  const [updatedInventory, setUpdatedInventory] = useState<IInventory>(inventory)
  const [editInventoryModalOpen, setEditInventoryModalOpen] = useState<boolean>(false)

  const updateInventory = (update: Partial<IInventory>) => {
    if (updatedInventory) {
      const updated = { ...updatedInventory, ...update };
      setUpdatedInventory(updated);
      updateInventories(updated, { type: 'UPDATE' });
    }
  };

  const atThreshold = () => {
    if (updatedInventory) {
      return updatedInventory.quantity <= updatedInventory.threshold;
    }
    return false;
  }

  const deleteInventory = () => {
    if (updatedInventory) {
      updateInventories(updatedInventory, { type: 'DELETE' });
    }
  };

  const toggleEditModal = () => {
    setEditInventoryModalOpen(state => !state)
  }

  return (
    <>
      <tr key={inventory.id} className={`${atThreshold() ? 'text-red-400 font-bold' : ''}`}>
        <td className="text-left px-2 py-3 whitespace-nowrap">
          <span className={`text-sm flex ${atThreshold() ? 'text-red-400 font-bold' : 'text-gray-500'}`}>
            {atThreshold() && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-[#e11d48]">
              <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>}
            {inventory.item.name}
          </span>
        </td>
        <td className="cursor-pointer text-left px-2 py-3 whitespace-nowrap">
          <span className={`text-sm ${atThreshold() ? 'text-red-400 font-bold' : 'text-gray-500'}`}>
            {convertNumToPrice(inventory.item.price)}
          </span>
        </td>
        <td className="text-left px-2 py-3 whitespace-nowrap">
          <span className={`text-sm ${atThreshold() ? 'text-red-400 font-bold' : 'text-gray-500'}`}>{inventory.quantity}
          </span>
        </td>
        <td className="text-left px-2 py-3 whitespace-nowrap">
          <span className={`text-sm ${atThreshold() ? 'text-red-400 font-bold' : 'text-gray-500'}`}>{inventory.item.category.name}</span>
        </td>
        <td className="text-left px-2 py-3 whitespace-nowrap">
          <span className={`text-sm ${atThreshold() ? 'text-red-400 font-bold' : 'text-gray-500'}`}>{inventory.threshold}
          </span>
        </td>
        <td className="text-left px-2 py-3 whitespace-nowrap">
          <span className={`text-sm ${atThreshold() ? 'text-red-400 font-bold' : 'text-gray-500'}`}>{inventory.lastUpdated ? new Date(inventory.lastUpdated).toLocaleDateString() : ''}</span>
        </td>
        <td className="text-right px-2 py-3 whitespace-nowrap flex gap-2">
          <svg onClick={toggleEditModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:fill-[#60a5fa] cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
          <svg onClick={deleteInventory} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:fill-[#e11d48] cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>


        </td>
      </tr>
      <EditInventoryModal
        inventory={updatedInventory}
        open={editInventoryModalOpen}
        toggleModal={toggleEditModal}
        updateInventory={updateInventory}
      />
    </>
  );
};

export default Inventory;