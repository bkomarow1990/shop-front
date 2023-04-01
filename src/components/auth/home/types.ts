import { IPaginationResponse } from "../../../api/templates/IPaginationResponse"

export enum ProductsActionTypes{
    GET_PRODUCTS = "GET_PRODUCTS",
    GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS"
} 
export interface ICategory{
    id: string;
    name: string;
}
export interface IProductState{
    products: IPaginatedProducts;
}
export type ProductAction =
    | IGetProductsAction
    | IGetProductsSuccessAction;
export interface IProduct{
    id : string;
    name: string;
    description: string;
    imageName: string;
    price: number;
    stockQuantity: number;
    cartQuantity : number | null;
    category: ICategory;
}
// export interface IProductInCart extends IProduct{
//     id : string;
//     name: string;
//     description: string;
//     imageName: string;
//     price: number;
//     stockQuantity: number;
//     category: ICategory;
// }
export interface IPaginatedProducts extends IPaginationResponse{
    items : IProduct[];
}
export interface IGetProductsAction{
    type : ProductsActionTypes.GET_PRODUCTS
}
export interface IGetProductsSuccessAction{
    type : ProductsActionTypes.GET_PRODUCTS_SUCCESS
    payload: IPaginatedProducts;
}