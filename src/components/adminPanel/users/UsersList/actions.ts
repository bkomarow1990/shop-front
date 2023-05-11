import axios, { AxiosError } from "axios";
import { Dispatch } from "react";
import { IGetUsersAdminResponse, IGetUsersRequest, UserAction, UserActionTypes } from "./types";
import instance from "../../../../api/configurations";

export const GetUsers = (data: IGetUsersRequest) => async (dispatch: Dispatch<UserAction>) => {
  dispatch({
    type: UserActionTypes.GET_USERS
  });
  try {
      const response = await instance.get<IGetUsersAdminResponse>("api/User/get-users", {
        params: 
        {
          PageIndex: data.pageIndex, 
          PageSize: data.pageSize, 
          Search: data.search
        }});
      dispatch({
        type: UserActionTypes.GET_USERS_SUCCESS,
        payload: await response.data
      });
      return Promise.resolve();
  
    } catch (err: any) {
      dispatch({
        type: UserActionTypes.GET_USERS_ERROR,
        payload: err
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
  }