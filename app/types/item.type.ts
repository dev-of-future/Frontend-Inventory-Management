import ICategory from "./category.type";
import IInventory from "./inventory.type";
import IPurchaseOrder from "./purchaseOrder.type";

export default interface IItem {
  id?: number;
  name: string;
  shortDescription: string;
  longDescription?: string;
  price: number;
  quantity?: number;
  category?: ICategory;
  inventories?: IInventory[];
  purchaseOrders?: IPurchaseOrder[];
}
