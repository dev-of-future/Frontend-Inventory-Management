import IOrderStatus from "./orderStatus.type";
import IStore from "./store.type";
import IPurchaseOrderItem from "./purchaseOrderItem.type";

export default interface IPurchaseOrder {
  id?: number;
  store?: IStore;
  purchaseOrderItems: IPurchaseOrderItem[];
  status: IOrderStatus;
  threshold: number;
  totalQuantity: number;
}
