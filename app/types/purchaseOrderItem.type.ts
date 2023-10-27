import IItem from "./item.type";
import IPurchaseOrder from "./purchaseOrder.type";

export default interface IPurchaseOrderItem {
  id?: number;
  quantity: number;
  item: IItem | null;
  purchaseOrder?: IPurchaseOrder;
}