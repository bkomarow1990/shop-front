import { Dispatch } from "react";
import {
  AdminCategoryAction,
  AdminCategoryActionTypes,
  ICategory,
} from "./types";
import instance from "../../../api/configurations";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";

export const GetAdminCategories =
  () => async (dispatch: Dispatch<AdminCategoryAction>) => {
    dispatch({
      type: AdminCategoryActionTypes.GET_CATEGORIES,
    });
    try {
      const response = await instance.get<ICategory[]>(
        "api/Category/get-all-categories-with-subcategories"
      );
      dispatch({
        type: AdminCategoryActionTypes.GET_CATEGORIES_SUCCESS,
        payload: await response.data,
      });
      console.log("resp");
      console.log(response);
      return Promise.resolve();
    } catch (err: any) {
      dispatch({
        type: AdminCategoryActionTypes.GET_CATEGORIES_ERROR,
        payload: err,
      });
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<any>;
        if (serverError && serverError.response) {
          const { errors } = serverError.response.data;
          return Promise.reject(errors);
        }
      }
      return Promise.reject();
    }
  };
export const GetAdminAllCategories =
  (isOnlyWithParent: boolean) => async (dispatch: Dispatch<AdminCategoryAction>) => {
    dispatch({
      type: AdminCategoryActionTypes.GET_ALL_CATEGORIES,
    });
    try {
      const response = await instance.get<ICategory[]>("api/Category/get-all", {params:{
        isOnlyWithParent: isOnlyWithParent
      }});
      dispatch({
        type: AdminCategoryActionTypes.GET_ALL_CATEGORIES_SUCCESS,
        payload: await response.data,
      });
      // console.log("resp");
      // console.log(response);
      return Promise.resolve();
    } catch (err: any) {
      dispatch({
        type: AdminCategoryActionTypes.GET_ALL_CATEGORIES_ERROR,
        payload: err,
      });
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<any>;
        if (serverError && serverError.response) {
          const { errors } = serverError.response.data;
          return Promise.reject(errors);
        }
      }
      return Promise.reject();
    }
  };
  export const DeleteAdminCategory = (id: string) => async (dispatch: Dispatch<AdminCategoryAction>) => {
    
    try {
        const response = await instance.delete("api/Category/delete-category", {params: {categoryId: id}});
        dispatch({
          type: AdminCategoryActionTypes.DELETE_CATEGORY,
          payload: id
        });
        Swal.fire({   
          position: 'top-end', 
          icon: 'success',
          title: 'Категорія успішно видалена',
          showConfirmButton: false,
          timer: 1000  
        });
        //console.log(response);
        return Promise.resolve();
      } catch (err: any) {
        //alert('ddd');
          let errorMessage: string = 'Щось пішло не так, можливо до вашої категорії підв\'язані товари, або підкатегорії, для початку видаліть їх для безпеки даних';
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorMessage,
          });
          if (axios.isAxiosError(err)) {
            const serverError = err as AxiosError<any>;
            if (serverError && serverError.response) {
              const { errors } = serverError.response.data;
              errorMessage = errors;
              return Promise.reject(errors);
            }
          }
          
           return Promise.reject();
      }
    }
