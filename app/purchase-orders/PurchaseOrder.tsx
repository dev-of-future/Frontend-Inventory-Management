import React, { useState } from "react";
import PurchaseOrderBody from "./PurchaseOrderBody";
import IPurchaseOrder from "../types/purchaseOrder.type";
import IPurchaseOrderItem from "../types/purchaseOrderItem.type";
import IStore from "../types/store.type";
import IOrderStatus from "../types/orderStatus.type";
import EditIListModal from "./EditIListModal";

const PurchaseOrder = ({ purchaseOrder, updatePurchaseOrders }: { purchaseOrder: IPurchaseOrder, updatePurchaseOrders: () => {} }) => {
  const [updatedPurchaseOrder, setUpdatedPurchaseOrder] = useState<IPurchaseOrder>(purchaseOrder)
  const [editItemsModalOpen, setEditItemsModalOpen] = useState<boolean>(false)

  // const editStatus = (status: IOrderStatus) => {
  //   setUpdatedPurchaseOrder((po) => ({ ...po, status }))
  //   handleUpdate()
  // }
  // const editStore = (store: IStore) => {
  //   setUpdatedPurchaseOrder((po) => ({ ...po, store }))
  //   handleUpdate()
  // }

  const toggleEditItemsModal = () => {
    setEditItemsModalOpen(!editItemsModalOpen)
  }

  const editItems = (purchaseOrderItems = []) => {
    setUpdatedPurchaseOrder((po) => ({ ...po, purchaseOrderItems }))
    handleUpdate()
  }

  // const deletePurchaseOrder = () => {
  //   handleUpdate('DELETE')
  // }


  const handleUpdate = (actionType = 'UPDATE') => {
    // call after any update
    updatePurchaseOrders(updatedPurchaseOrder, { type: actionType });
  }

  return (
    purchaseOrder && <>
      <PurchaseOrderBody
        purchaseOrder={purchaseOrder}
        // editStatus={editStatus}
        // open={editStore}
        openEditItemsModal={toggleEditItemsModal}
      // deletePurchaseOrder={deletePurchaseOrder}
      />
      <EditIListModal
        storeName={purchaseOrder.store?.name}
        status={purchaseOrder.status}
        purchaseOrderId={purchaseOrder.id}
        purchaseOrderItems={purchaseOrder.purchaseOrderItems}
        updateIList={editItems}
        open={editItemsModalOpen}
        toggleModal={toggleEditItemsModal}
      />
    </>
  )
};

export default PurchaseOrder;