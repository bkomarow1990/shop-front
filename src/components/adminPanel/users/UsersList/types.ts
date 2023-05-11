import { IPaginationRequest } from "../../../../api/templates/IPaginationRequest";
import { IPaginationResponse } from "../../../../api/templates/IPaginationResponse";

export interface IUserAdmin{
    id: string;
    registrationDay: Date;
    phoneNumber: string;
}
export interface IDetailedUser{
    id: string;
}
export interface IGetUsersAdminResponse extends IPaginationResponse{
    items: IUserAdmin[];    
}
export interface IGetUsersRequest extends IPaginationRequest{
    search: string | null;
}
// REDUX
export enum UserActionTypes{
    GET_USERS = "GET_USERS",
    GET_USERS_SUCCESS = "GET_USERS_SUCCESS",
    GET_USERS_ERROR = "GET_USERS_ERROR",
}
export interface GetUsersAction{
    type: UserActionTypes.GET_USERS;
}
export interface GetUsersSuccessAction{
    type: UserActionTypes.GET_USERS_SUCCESS;
    payload: IGetUsersAdminResponse;
}
export interface GetUsersErrorAction{
    type: UserActionTypes.GET_USERS_ERROR;
    payload: string;
}

export interface UserState{
    users: IGetUsersAdminResponse;
    isLoading: boolean;
}

export type UserAction = 
| GetUsersAction 
| GetUsersSuccessAction 
| GetUsersErrorAction;