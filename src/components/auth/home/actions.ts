import axios from "axios";
import { Dispatch } from "react";
import Swal from "sweetalert2";
import instance from "../../../api/configurations";
import { IDetailedProduct, IGetProductsRequest, IPaginatedProducts, ProductAction, ProductsActionTypes } from "./types";
import { Category } from "./Categories/types";

export const GetProducts = (data: IGetProductsRequest) => async (dispatch: Dispatch<ProductAction>) => {
    try {
      dispatch({
        type: ProductsActionTypes.GET_PRODUCTS
      });
      const response = await instance.get<IPaginatedProducts>("api/Product/get-products", {
        params: {
          pageIndex: data.pageIndex,
          pageSize: data.pageSize,
          productName: data.search,
          priceFrom: data.priceFrom,
          priceTo: data.priceTo,
          sortBy: data.sortBy,
          categoryId: data.category,
          isSortAscending: data.isSortAscending
        }});
      const responseData = await response.data;
      dispatch({
        type: ProductsActionTypes.GET_PRODUCTS_SUCCESS,
        payload: responseData
      });
      return Promise.resolve();

    } catch (err: any) {
      dispatch({
        type: ProductsActionTypes.GET_PRODUCTS_ERROR
      });
        if (axios.isAxiosError(err)) {
          const serverError = err;
          if (serverError && serverError.response) {
            const { errors } = serverError.response.data;
            return Promise.reject(errors);
          }
        }
         return Promise.reject();
    }
}
export const GetProduct = (id: string) => async (dispatch: Dispatch<ProductAction>) => {
  try {
    const response = await instance.get<IDetailedProduct>("api/Product/get-product-by-id", {
      params: {
        productId: id,
      }});
    const responseData = await response.data;
    dispatch({
      type: ProductsActionTypes.GET_PRODUCT,
      payload: responseData
    });
    return Promise.resolve();

  } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const serverError = err;
        if (serverError && serverError.response) {
          const { errors } = serverError.response.data;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errors || 'Something went wrong!',
          });
          return Promise.reject(errors);
        }
      }
       return Promise.reject();
  }
}


export const GetCategories = () => async (dispatch: Dispatch<ProductAction>) => {
  try {
    const response = await instance.get<Category[]>("api/Category/get-all-categories-with-subcategories");
    const responseData = await response.data;
    //console.log(responseData);
    //alert(responseData);
    dispatch({
      type: ProductsActionTypes.GET_CATEGORIES,
      payload: responseData
    });
    return Promise.resolve();

  } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const serverError = err;
        if (serverError && serverError.response) {
          const { errors } = serverError.response.data;
          return Promise.reject(errors);
        }
      }
       return Promise.reject();
  }
}

