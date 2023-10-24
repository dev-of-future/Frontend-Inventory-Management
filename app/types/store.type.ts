import IInventory from "./inventory.type";

enum IStoreType {
  RETAIL = 'RETAIL',
  WAREHOUSE = 'WAREHOUSE',
  WHOLESALE = 'WHOLESALE',
  CLUB = 'CLUB',
  SUPERMARKET = 'SUPERMARKET'
}

export default interface IStore {
  id?: number;
  name: string;
  address: string;
  email?: string;
  phone: string;
  quantity: number;
  type: IStoreType;
  inventories?: IInventory[];
  openingDate: Date;
}