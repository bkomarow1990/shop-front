import { IProductState, ProductAction, ProductsActionTypes } from "./types";

const initialState: IProductState = {
    loading: false,
    product: null,
    products: {
      items: [],
      pageIndex: 1,
      pageSize: 20,
      hasNextPage: false,
      hasPreviousPage: false,
      totalCount: 0,
      totalPages: 0
    },
    categories: []
};

export const productReducer = (state=initialState, action: ProductAction) : IProductState => {
  switch (action.type) {

    case ProductsActionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: { ...action.payload },
      };
    case ProductsActionTypes.GET_PRODUCT:
      return{
        ...state,
        product: action.payload
      }
    case ProductsActionTypes.GET_CATEGORIES:
      return{
        ...state,
        categories: action.payload
      }
    default:
      return state;
  }
}