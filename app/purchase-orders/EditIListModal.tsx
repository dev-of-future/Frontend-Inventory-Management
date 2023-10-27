import React, { useState, useEffect } from 'react'
import FormErrors from '../types/formErrors.type';
import Select from 'react-tailwindcss-select';
import DialogModal from '../components/DialogModal';
import IPurchaseOrderItem from '../types/purchaseOrderItem.type';
import IItem from '../types/item.type';
import ItemService from '../services/item.service';
import PurchaseOrderItemService from '../services/purchaseOrderItem.service';
import POIList from './POIList';

type EditIListModalProps = {
  storeName: string;
  status: string;
  purchaseOrderId: number
  purchaseOrderItems: IPurchaseOrderItem[];
  updateIList: (items: IPurchaseOrderItem[]) => void;
  open: boolean;
  toggleModal: () => void;
};

const EditIListModal = ({ purchaseOrderId, storeName, status, purchaseOrderItems = [], updateIList, open, toggleModal }: EditIListModalProps) => {
  const [items, setItems] = useState<IItem[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [purchaseOrderItem, setPurchaseOrderItem] = useState<IPurchaseOrderItem>();
  const [updatedPurchaseOrderItems, setUpdatedPurchaseOrderItems] = useState<IPurchaseOrderItem[] | []>(purchaseOrderItems);

  useEffect(() => {
    setUpdatedPurchaseOrderItems(purchaseOrderItems)
  }, [purchaseOrderItems, purchaseOrderId])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await ItemService.getAllItems();
        setItems(response.data);
      } catch (err: any) {
        let errMsg = 'Unable to load Items'
        if (err.response) {
          errMsg = err.response.data?.message;
        }
        console.error(errMsg)
      }
    }

    fetchItems()
  }, [])

  useEffect(() => {
    const newErrors: FormErrors = {}

    const validateForm = () => {
      if (!purchaseOrderItem?.item) {
        newErrors.item = 'Item is required'
      }

      if (!purchaseOrderItem?.quantity || purchaseOrderItem?.quantity < 1) {
        newErrors.quantity = 'Item Quantity is required'
      }

      setErrors(newErrors)
      setIsFormValid(Object.keys(newErrors).length === 0);
    }

    validateForm()
  }, [purchaseOrderItem])

  const addPOI = async () => {
    if (!purchaseOrderItem) return;
    try {
      const createdItem = await PurchaseOrderItemService.createPurchaseOrderItem({ ...purchaseOrderItem, purchaseOrder: { id: purchaseOrderId } })
      setUpdatedPurchaseOrderItems((items) => {
        setPurchaseOrderItem(undefined)
        return [...items, createdItem.data]
      })
      setErrors({})
    } catch (error: any) {
      console.error(error)
      setErrors({ purchaseOrderItems: 'Unable to add PO Item' })
    }
  }

  const deletePOI = async (id: number) => {
    try {
      const response = await PurchaseOrderItemService.deletePurchaseOrderItem(id);
      setUpdatedPurchaseOrderItems((items) => {
        return items.filter((item: IPurchaseOrderItem) => item.id !== id);
      });
      setErrors({})
    } catch (error: any) {
      console.error(error)
      setErrors({ purchaseOrderItems: 'Unable to delete PO Item' })
    }
  }

  // delete & add
  const handleChange = (e: any) => {
    e.preventDefault()
    const { name, value } = e.target;
    setPurchaseOrderItem({ ...purchaseOrderItem, [name]: value })
  }

  const handleSelectChange = (data) => {
    setPurchaseOrderItem({ ...purchaseOrderItem, item: JSON.parse(data.value) })
  }

  const handleSubmit = () => {
    updateIList(updatedPurchaseOrderItems);
    toggleModal()
    // setUpdatedPurchaseOrderItems([]);
  }

  return (
    <DialogModal
      open={open}
      toggleModal={toggleModal}
      handleSubmit={handleSubmit}
      header="Purchase Order Items"
    >
      <>
        <div className='py-1 pb-2 flex justify-between font-semibold'>
          <p>Store: {storeName}</p>
          <p>Status: {status}</p>
        </div>
        <div className=''>
          <div className='mt-1'>
            <Select
              placeholder="Select an Item"
              value={purchaseOrderItem ? { value: JSON.stringify(purchaseOrderItem.item), label: purchaseOrderItem.item?.name } : null}
              primaryColor={"indigo"}
              onChange={handleSelectChange}
              options={items.filter((item) => !updatedPurchaseOrderItems?.some((poi) => poi.item?.id === item.id)).map((item) => ({ value: JSON.stringify(item), label: item.name }))}
            />
            {errors.item && <div className="text-xs alert-danger text-error">{errors.item}</div>}
          </div>

          <div className='mt-5 flex justify-between'>
            <div>
              <input
                className="input input-bordered w-full max-w-xs"
                type="number"
                name="quantity"
                value={purchaseOrderItem?.quantity || 0}
                min={1}
                onChange={handleChange}
              />
              {errors.quantity && <div className="text-xs alert-danger text-error">{errors.quantity}</div>}
            </div>
            <button onClick={addPOI} className='btn btn-accent'>ADD ITEM</button>
          </div>
        </div>

        {updatedPurchaseOrderItems.length != 0 && <POIList purchaseOrderItems={updatedPurchaseOrderItems} deletePOI={deletePOI} />}
      </>
    </DialogModal>
  )
}

export default EditIListModal