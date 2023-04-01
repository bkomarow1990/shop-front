import { IProduct } from "../auth/home/types";

export enum CartActionTypes {
    ADD_TO_CART = 'ADD_TO_CART',
    REMOVE_FROM_CART = 'REMOVE_FROM_CART',
}
export interface ICartState{
  products: IProduct[];
}
export interface AddToCartAction {
    type: CartActionTypes.ADD_TO_CART;
    payload: IProduct;
  }
  
export interface RemoveFromCartAction {
    type: CartActionTypes.REMOVE_FROM_CART;
    payload: IProduct;
  }
  
export const addToCart = (item: IProduct): AddToCartAction => ({
    type: CartActionTypes.ADD_TO_CART,
    payload: item,
  });
  
export const removeFromCart = (item: IProduct): RemoveFromCartAction => ({
    type: CartActionTypes.REMOVE_FROM_CART,
    payload: item,
  });
  
export type CartAction = AddToCartAction | RemoveFromCartAction;