import axios, { AxiosError } from "axios";
import { Dispatch } from "react";
import Swal from "sweetalert2";
import instance from "../../api/configurations";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IProduct } from "../auth/home/types";
import { ILoginErrors } from "../auth/login/types";
import { CartAction, CartActionTypes, CartItem } from "./types";

export const AddToCart = (data: CartItem) => async (dispatch: Dispatch<CartAction>) => {
  try {
    // const response = await instance.put("api/Cart/add-product-to-cart", {productId: data.product.id,quantity: data.quantity});
    // alert('ddd');
    dispatch({ type: CartActionTypes.ADD_TO_CART, payload: data });
    return Promise.resolve();
  }
  catch (err: any) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.response.data || 'Something went wrong!',
    });
    return Promise.reject(err);
  }
}
export const RemoveFromCart = (data: string) => async (dispatch: Dispatch<CartAction>) => {
  try {
    // await instance.delete("api/Cart/remove-cart-product", {params: {productId: data}});
    dispatch({ type: CartActionTypes.REMOVE_FROM_CART, payload: data });
    return Promise.resolve();
  }
  catch (err: any) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.response.data || 'Something went wrong!',
    });
    return Promise.reject(err);
  }
}
export const GetCart = (data: string[]) => async (dispatch: Dispatch<CartAction>) => {
  try {
    const response = await instance.get<IProduct[]>("api/Cart/get-cart", { params: { productsIds: data.join(',')} });
    dispatch({ type: CartActionTypes.GET_CART, payload: response.data });
    return Promise.resolve();
  }
  catch (err: any) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.response.data || 'Something went wrong!',
    });
    return Promise.reject(err);
  }
}
export const HandleCart = (data: CartItem[]) => async (dispatch: Dispatch<CartAction>) => {
    try{
      const mappedData = data.map(x => {return {productId: x.product.id, quantity: x.quantity}});
      const response = await instance.post("api/Order/handle-cart", mappedData);
      dispatch({ type: CartActionTypes.CLEAR_CART });
      Swal.fire({
        icon: 'success',
        title: 'Вітаю!!!',
        text: 'Ви успішно обробили кошик!',
      });
    }
    catch(err: any){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response.data || 'Something went wrong!',
      });
      return Promise.reject(err);
    }
    return Promise.resolve();
}