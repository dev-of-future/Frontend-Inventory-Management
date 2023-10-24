import IInventory from "./inventory.type";
import IStoreType from "./storeType.type";

export default interface IStore {
  id?: number;
  name: string;
  address: string;
  email?: string;
  phone: string;
  type: IStoreType;
  inventories?: IInventory[];
  openingDate: string;
}