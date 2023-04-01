import { IProductState, ProductAction, ProductsActionTypes } from "./types";

const initialState: IProductState = {
    products: {
      items: [],
      pageIndex: 1,
      pageSize: 20,
      hasNextPage: false,
      hasPreviousPage: false,
      totalCount: 0,
      totalPages: 0
    }
};

export const productReducer = (state=initialState, action: ProductAction) : IProductState => {
  switch (action.type) {

    case ProductsActionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: { ...action.payload },
      };

    default:
      return state;
  }
}