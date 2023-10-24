import ISupplier from "./supplier.type";

export default interface ICategory {
  id?: number;
  name: string;
  supplier?: ISupplier
}
