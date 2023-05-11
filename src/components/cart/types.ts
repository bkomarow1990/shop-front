import { IProduct } from "../auth/home/types";

export enum CartActionTypes {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  GET_CART = 'GET_CART',
  CLEAR_CART = 'CLEAR_CART'
}
// export interface ICartData {
//   productId: string;
//   quantity: number;
// }
export interface ICartState {
  products: CartItem[];
}
export interface AddToCartAction {
  type: CartActionTypes.ADD_TO_CART;
  payload: CartItem;
}
export interface CartItem{
  product: IProduct;
  quantity: number;
}
export interface RemoveFromCartAction {
  type: CartActionTypes.REMOVE_FROM_CART;
  payload: string;
}
export interface GetCartAction{
  type: CartActionTypes.GET_CART;
  payload: IProduct[]
}
export interface ClearCartAction{
  type: CartActionTypes.CLEAR_CART;
}


export const addToCart = (item: CartItem): AddToCartAction => ({
  type: CartActionTypes.ADD_TO_CART,
  payload: item,
});

export const clearCart = (): ClearCartAction => ({
  type: CartActionTypes.CLEAR_CART
});

export const removeFromCart = (item: string): RemoveFromCartAction => ({
  type: CartActionTypes.REMOVE_FROM_CART,
  payload: item,
});
export const getCart = (data : IProduct[]) : GetCartAction => ({
  type: CartActionTypes.GET_CART,
  payload: data
});

export type CartAction = AddToCartAction | RemoveFromCartAction | GetCartAction | ClearCartAction;