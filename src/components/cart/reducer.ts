import { IProduct } from "../auth/home/types";
import { CartAction, CartActionTypes, ICartState } from "./types";

const initialState: ICartState = {
  products: [] as IProduct[]
};

export const cartReducer = (state = initialState, action: CartAction): ICartState => {
    switch (action.type) {
      case CartActionTypes.ADD_TO_CART:
        const existingItem = state.products.find((i) => i.id === action.payload.id);
        if (existingItem) {
          return {
            ...state,
            products: state.products.map((i) =>
            i.id === action.payload.id ? { ...i, cartQuantity: i.cartQuantity ? i.cartQuantity + 1 : 1 } : i
          )
          };
        } 
        else {
          const newItem = { ...action.payload, cartQuantity: 1 };
          return {...state, products: [...state.products, newItem] };
        }
      case CartActionTypes.REMOVE_FROM_CART:
        return {
          ...state,
          products: state.products.filter((i) => i.id !== action.payload.id)
        };
      default:
        return state;
    }
  };