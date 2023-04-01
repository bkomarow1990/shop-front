import { Dispatch } from "react";
import { IProduct } from "../auth/home/types";
import { CartAction, CartActionTypes } from "./types";

export const AddToCart = (data: IProduct) => async (dispatch: Dispatch<CartAction>) => {
    try {
      dispatch({ type: CartActionTypes.ADD_TO_CART, payload: data });
      return Promise.resolve();
    } 
    catch (err: any) {
         return Promise.reject(err);
    }
}
export const RemoveFromCart = (data: IProduct) => async (dispatch: Dispatch<CartAction>) => {
    try {
      dispatch({ type: CartActionTypes.REMOVE_FROM_CART, payload: data });
      return Promise.resolve();
    } 
    catch (err: any) {
         return Promise.reject(err);
    }
}
