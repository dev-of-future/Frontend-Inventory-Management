import React, { useState, useEffect } from 'react';
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
  purchaseOrderId: number;
  purchaseOrderItems: IPurchaseOrderItem[];
  updateIList: (items: IPurchaseOrderItem[]) => void;
  open: boolean;
  toggleModal: () => void;
};

const initialState: IPurchaseOrderItem = { quantity: 1, item: null };

const EditIListModal: React.FC<EditIListModalProps> = ({
  purchaseOrderId,
  storeName,
  status,
  purchaseOrderItems = [],
  updateIList,
  open,
  toggleModal,
}: EditIListModalProps) => {
  const [items, setItems] = useState<IItem[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [purchaseOrderItem, setPurchaseOrderItem] = useState<IPurchaseOrderItem>(
    initialState
  );
  const [updatedPurchaseOrderItems, setUpdatedPurchaseOrderItems] = useState<IPurchaseOrderItem[]>(
    purchaseOrderItems
  );
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setUpdatedPurchaseOrderItems(purchaseOrderItems);
  }, [purchaseOrderItems, purchaseOrderId]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await ItemService.getAllItems();
        setItems(response.data);
      } catch (error: any) {
        const errMsg = error.response ? error.response.data.message : 'Unable to load Items';
        console.error(errMsg);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const validateForm = () => {
      const newErrors: FormErrors = {};

      if (!purchaseOrderItem?.item) {
        newErrors.item = 'Item is required';
      }

      if (!purchaseOrderItem?.quantity || purchaseOrderItem?.quantity < 1) {
        newErrors.quantity = 'Item Quantity is required';
      } else if (purchaseOrderItem.quantity > (purchaseOrderItem.item?.quantity || Infinity)) {
        newErrors.quantity = `Purchase Order Item Quantity cannot be greater than Item Quantity in stock: ${purchaseOrderItem.item?.quantity}`;
      }

      setErrors(newErrors);
      setIsFormValid(Object.keys(newErrors).length === 0);
    };

    validateForm();
  }, [purchaseOrderItem]);

  const addPOI = async () => {
    if (!isFormValid || !purchaseOrderItem) return;

    try {
      const createdItem = await PurchaseOrderItemService.createPurchaseOrderItem({
        ...purchaseOrderItem,
        purchaseOrder: { id: purchaseOrderId },
      });
      setUpdatedPurchaseOrderItems((items) => [...items, createdItem.data]);
      setPurchaseOrderItem(initialState);
      setErrors({});
    } catch (error: any) {
      let errMsg = 'Unable to add PO Item'
      if (error.response) {
        errMsg = error.response.data?.message;
      }
      console.error(errMsg)
      setErrors({ purchaseOrderItems: errMsg });
    }
  };

  const deletePOI = async (id: number) => {
    try {
      await PurchaseOrderItemService.deletePurchaseOrderItem(id);
      setUpdatedPurchaseOrderItems((items) => items.filter((item) => item.id !== id));
      setErrors({});
    } catch (error: any) {
      let errMsg = 'Unable to delete PO Item'
      if (error.response) {
        errMsg = error.response.data?.message;
      }
      console.error(errMsg)
      setErrors({ purchaseOrderItems: errMsg });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPurchaseOrderItem((prevItem: IPurchaseOrderItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSelectChange = (data: any) => {
    setPurchaseOrderItem((prevItem: IPurchaseOrderItem) => ({ ...prevItem, item: JSON.parse(data.value) }));
  };

  const handleSubmit = () => {
    updateIList(updatedPurchaseOrderItems);
    toggleModal();
  };

  return (
    <DialogModal open={open} toggleModal={toggleModal} handleSubmit={handleSubmit} header="Purchase Order Info">
      <>
        <div className='py-1 pb-2 flex justify-between font-semibold'>
          <p>Store: {storeName}</p>
          <p>Status: {status}</p>
        </div>
        <div className='mt-1'>
          <div className='mt-2'>
            <label className='block text-sm font-medium text-gray-700'>Add Items to Order</label>
            <Select
              placeholder="Select an Item"
              value={purchaseOrderItem?.item ? { value: JSON.stringify(purchaseOrderItem.item), label: purchaseOrderItem.item?.name } : null}
              primaryColor="indigo"
              onChange={handleSelectChange}
              options={items.filter((item) => !updatedPurchaseOrderItems.some((poi) => poi.item?.id === item.id)).map((item) => ({
                value: JSON.stringify(item),
                label: item.name,
              }))}
            />
            {errors.item && <div className="text-xs alert-danger text-error">{errors.item}</div>}
          </div>

          <div className='mt-1 mb-6 flex justify-between'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Quantity of Item</label>
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
            <button onClick={addPOI} className='mt-4 mb-10 btn btn-accent'>ADD ITEM</button>
          </div>
        </div>

        {errors.purchaseOrderItems && <div className="text-sm mt-3 alert-danger text-error">{errors.purchaseOrderItems}</div>}
        {updatedPurchaseOrderItems.length !== 0 && <POIList purchaseOrderItems={updatedPurchaseOrderItems} deletePOI={deletePOI} />}
      </>
    </DialogModal>
  );
};

export default EditIListModal;
