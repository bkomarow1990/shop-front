import { UserAction, UserActionTypes, UserState } from "./types";

const initialState: UserState = {
    users: {
        items: [],
        pageIndex: 1,
        pageSize: 20,
        hasNextPage: false,
        hasPreviousPage: false,
        totalCount: 0,
        totalPages: 0
    },
    isLoading: false
};

export const adminUserReducer = (state = initialState, action: UserAction) : UserState => {
    switch(action.type){
        case UserActionTypes.GET_USERS:
            return{
                ...state,
                isLoading: true
            }
        case UserActionTypes.GET_USERS_SUCCESS:
            return{
                ...state,
                isLoading: false,
                users: action.payload
            }
        case UserActionTypes.GET_USERS_ERROR:
            return{
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}