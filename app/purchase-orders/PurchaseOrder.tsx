import React, { useState } from "react";
import PurchaseOrderBody from "./PurchaseOrderBody";
import IPurchaseOrder from "../types/purchaseOrder.type";
import AddStoreModal from "./AddStoreModal";
import IOrderStatus from "../types/orderStatus.type";
import EditIListModal from "./EditIListModal";
import ChangeStatusModal from "./ChangeStatusModal";

const PurchaseOrder = ({ purchaseOrder, updatePurchaseOrders }: { purchaseOrder: IPurchaseOrder, updatePurchaseOrders: (update: Partial<IPurchaseOrder>, options: { type: string }) => void }) => {
  const [updatedPurchaseOrder, setUpdatedPurchaseOrder] = useState<IPurchaseOrder>(purchaseOrder)
  const [editItemsModalOpen, setEditItemsModalOpen] = useState<boolean>(false)
  const [editStoreModalOpen, setEditStoreModalOpen] = useState<boolean>(false)
  const [changeStatusModalOpen, setChangeStatusModalOpen] = useState<boolean>(false)

  const toggleModal = (stateFunc: any) => () => stateFunc((prev: boolean) => !prev);

  const updatePurchaseOrder = (update: Partial<IPurchaseOrder>) => {
    if (updatedPurchaseOrder) {
      const updated = { ...updatedPurchaseOrder, ...update };
      setUpdatedPurchaseOrder(updated);
      updatePurchaseOrders(updated, { type: 'UPDATE' });
    }
  };

  const deletePurchaseOrder = () => {
    if (updatedPurchaseOrder) {
      updatePurchaseOrders(updatedPurchaseOrder, { type: 'DELETE' });
    }
  };

  return updatedPurchaseOrder ? (
    <>
      <PurchaseOrderBody
        purchaseOrder={updatedPurchaseOrder}
        openChangeStatusModal={toggleModal(setChangeStatusModalOpen)}
        openEditStoreModal={toggleModal(setEditStoreModalOpen)}
        openEditItemsModal={toggleModal(setEditItemsModalOpen)}
        deletePurchaseOrder={deletePurchaseOrder}
      />
      {updatedPurchaseOrder.id ? <EditIListModal
        storeName={updatedPurchaseOrder.store?.name || ''}
        status={updatedPurchaseOrder.status || IOrderStatus.PENDING}
        purchaseOrderId={updatedPurchaseOrder.id}
        purchaseOrderItems={updatedPurchaseOrder.purchaseOrderItems || []}
        updateIList={(items) => updatePurchaseOrder({ purchaseOrderItems: items })}
        open={editItemsModalOpen}
        toggleModal={toggleModal(setEditItemsModalOpen)}
      /> : null}
      {updatedPurchaseOrder.status ? <ChangeStatusModal
        status={updatedPurchaseOrder.status}
        changeStatus={(status) => updatePurchaseOrder({ status })}
        open={changeStatusModalOpen}
        toggleModal={toggleModal(setChangeStatusModalOpen)}
      /> : null}
      {updatedPurchaseOrder.store ? <AddStoreModal
        store={updatedPurchaseOrder.store}
        addStore={(store) => updatePurchaseOrder({ store })}
        open={editStoreModalOpen}
        toggleModal={toggleModal(setEditStoreModalOpen)}
      /> : null}
    </>
  ) : null;
};

export default PurchaseOrder;
