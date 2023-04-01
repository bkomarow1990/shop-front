import { Dispatch } from "react";
import { AuthAction, AuthActionTypes, ILoginErrors, IUser } from "./types";
import axios, { AxiosError } from "axios";
import setAuthToken from '../../../helpers/setAuthToken';
import { ILogin } from './types';
import jwtDecode from "jwt-decode";
import instance from "../../../api/configurations";

export interface ILoginResponse {
  id: string
  jwtToken: string
  email: string
}

export const LoginUser = (data: ILogin) => async (dispatch: Dispatch<AuthAction>) => {
        try {
          console.log(process.env.REACT_APP_SERVER_URL);
          const response = await instance.post<ILoginResponse>("api/Account/login", data);
          const { jwtToken } = await response.data;
          setAuthUserByToken(jwtToken, dispatch);
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

export const setAuthUserByToken = (token: string , dispatch: Dispatch<any>) => {

  setAuthToken(token);
  localStorage.token = token;
  const dataUser : any = jwtDecode(token);
  console.log('data:' , dataUser);
  //const isMyTokenExpired = isExpired(token);
  //const dataUser = jwt.decode(token, { json: true });
  
  const user: IUser = {
    email: dataUser!.name,
    image: dataUser!.image,
    roles: dataUser!.roles,
  };
  
  dispatch({
    type: AuthActionTypes.LOGIN_AUTH_SUCCESS,
    payload: user,
  });


}

export const LogoutUser = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
          setAuthToken('');
            dispatch({ type: AuthActionTypes.LOGOUT_AUTH });
            localStorage.removeItem("token")
    }
}