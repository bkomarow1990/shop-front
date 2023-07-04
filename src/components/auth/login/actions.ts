import { Dispatch } from "react";
import { AuthAction, AuthActionTypes, ILoginErrors, IUser } from "./types";
import axios, { AxiosError } from "axios";
import setAuthToken from '../../../helpers/setAuthToken';
import { ILogin } from './types';
import jwtDecode from "jwt-decode";
import instance from "../../../api/configurations";

export interface ILoginResponse {
  id: string;
  jwtToken: string;
  refreshToken: string;
  email: string;
}

export const LoginUser = (data: ILogin) => async (dispatch: Dispatch<AuthAction>) => {
        try {
          const response = await instance.post<ILoginResponse>("api/Account/login", data);
          const { jwtToken, refreshToken } = await response.data;
          setAuthUserByToken(jwtToken, refreshToken, dispatch);
          return Promise.resolve();

        } catch (err: any) {
            if (axios.isAxiosError(err)) {
              const serverError = err as AxiosError<ILoginErrors>;
              if (serverError && serverError.response) {
                const { errors } = serverError.response.data;
                return Promise.reject(errors);
              }
            }
             return Promise.reject();
        }
    }

export const setAuthUserByToken = (accessToken: string, refreshToken : string, dispatch: Dispatch<any>) => {

  setAuthToken(accessToken);
  localStorage.accessToken = accessToken;
  localStorage.refreshToken = refreshToken;
  const dataUser : any = jwtDecode(accessToken);
  console.log('data:' , dataUser);
  //const isMyTokenExpired = isExpired(token);
  //const dataUser = jwt.decode(token, { json: true });
  
  const user: IUser = {
    id: dataUser!['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
    email: dataUser!.name,
    image: dataUser!.image,
    roles: dataUser!['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
  };
  console.log('user: ',user);

  dispatch({
    type: AuthActionTypes.LOGIN_AUTH_SUCCESS,
    payload: user,
  });


}

export const LogoutUser = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
          setAuthToken('');
            dispatch({ type: AuthActionTypes.LOGOUT_AUTH });
            localStorage.removeItem("accessToken")
    }
}