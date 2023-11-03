import IItem from "./item.type";

interface IHomePageStats {
  totalStores: number;
  totalInventories: number;
  totalPurchaseOrders: number;
  totalItems: number;
  pendingPurchaseOrders: number;
  deliveredPurchaseOrders: number;
  inventoriesAtThreshold: number;
  mostPopularItemInPurchaseOrders: IItem;
  mostPopularItemInInventory: IItem;
}

export default IHomePageStats