import IItem from "./item.type";
import IStore from "./store.type";

export default interface IInventory {
  id?: number;
  store?: IStore;
  item?: IItem;
  threshold: number;
  quantity: number;
}