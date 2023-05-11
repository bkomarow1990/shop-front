import Swal from "sweetalert2";
import { IProduct } from "../auth/home/types";
import { CartAction, CartActionTypes, CartItem, ICartState } from "./types";

const initialState: ICartState = {
  products: JSON.parse(sessionStorage.getItem("cart") || "[]")
};

export const cartReducer = (state = initialState, action: CartAction): ICartState => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      const existingItem = state.products.find((i) => i.product.id === action.payload.product.id);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Product added to cart',
        showConfirmButton: false,
        timer: 1000
      })
      if (existingItem) {
        const newProducts = state.products.map((i) =>
          i.product.id === action.payload.product.id ? { ...i, quantity: i.quantity + action.payload.quantity } : i);
        sessionStorage.setItem("cart", JSON.stringify(newProducts));
        return {
          ...state,
          products: newProducts
        };

      }
      else {
        const newProducts = [...state.products, action.payload];
        sessionStorage.setItem("cart", JSON.stringify(newProducts));
        //const newItem = { ...action.payload, cartQuantity: 1 };
        return { ...state, products: newProducts };
      }
    case CartActionTypes.REMOVE_FROM_CART:
      {
        const newProducts = state.products.filter((i) => i.product.id !== action.payload);
        sessionStorage.setItem("cart", JSON.stringify(newProducts));
        return {
          ...state,
          products: newProducts
        };
      }
    case CartActionTypes.GET_CART:
      const connectedCartItems: Array<CartItem> = state.products.map(cartItem => {
        const product = action.payload.find(p => p.id === cartItem.product.id);
        return { product, quantity: cartItem.quantity };
      }).filter(ci => ci.product) as CartItem[];
      sessionStorage.setItem("cart", JSON.stringify(connectedCartItems));
      return {
        ...state,
        products: connectedCartItems
      };
    case CartActionTypes.CLEAR_CART:
      return{
        ...state,
        products: []
      }
    default:
      return state;
  }
};