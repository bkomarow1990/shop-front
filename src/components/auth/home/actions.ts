import axios from "axios";
import { Dispatch } from "react";
import instance from "../../../api/configurations";
import { IPaginationRequest } from "../../../api/templates/IPaginationRequest";
import { IPaginationResponse } from "../../../api/templates/IPaginationResponse";
import { IGetProductsAction, IGetProductsSuccessAction, IPaginatedProducts, ProductAction, ProductsActionTypes } from "./types";

export const GetProducts = (data: IPaginationRequest) => async (dispatch: Dispatch<ProductAction>) => {
    try {
      const response = await instance.get<IPaginatedProducts>("api/Product/get-products", {
        params: {
          pageIndex: data.pageIndex,
          pageSize: data.pageSize
        }});
      const responseData = await response.data;
      dispatch({
        type: ProductsActionTypes.GET_PRODUCTS_SUCCESS,
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
