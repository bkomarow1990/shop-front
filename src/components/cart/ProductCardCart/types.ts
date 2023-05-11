import { IProduct } from "../../auth/home/types";

export interface IProductCardCartProps {
    product: IProduct;
    quantity: number;
    children: React.ReactNode;
}