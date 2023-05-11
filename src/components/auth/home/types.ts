import { IPaginationRequest } from "../../../api/templates/IPaginationRequest";
import { IPaginationResponse } from "../../../api/templates/IPaginationResponse"
import { Category } from "./Categories/types";

export enum ProductsActionTypes{
    GET_PRODUCTS = "GET_PRODUCTS",
    GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS",
    GET_PRODUCT = "GET_PRODUCT",
    GET_CATEGORIES = "GET_CATEGORIES"
} 
export interface ICategory{
    id: string;
    name: string;
}
export interface IProductState{
    product : IDetailedProduct | null;
    products: IPaginatedProducts;
    loading: boolean;
    categories: Category[];
}
export interface IGetProductsRequest extends IPaginationRequest{
    search: string | null;
    priceFrom: number | null;
    priceTo: number | null;
    sortBy: string | null;
    isSortAscending: boolean;
    category: string | null;
}
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
export interface IDetailedProduct extends IProduct{

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
export interface IGetProductAction{
    type: ProductsActionTypes.GET_PRODUCT;
    payload: IDetailedProduct;
}
export interface IGetProductsAction{
    type : ProductsActionTypes.GET_PRODUCTS
}
export interface IGetProductsSuccessAction{
    type : ProductsActionTypes.GET_PRODUCTS_SUCCESS
    payload: IPaginatedProducts;
}
export interface IGetCategoriesSuccessAction{
    type: ProductsActionTypes.GET_CATEGORIES;
    payload: Category[];
}

export type ProductAction =
    | IGetProductsAction
    | IGetProductsSuccessAction
    | IGetProductAction
    | IGetCategoriesSuccessAction
    ;