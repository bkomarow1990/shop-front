import { combineReducers } from 'redux';
import { productReducer } from '../../components/auth/home/reducer';
import { authReducer } from "../../components/auth/login/reducer";
import { cartReducer } from '../../components/cart/reducer';
export const rootReducer = combineReducers({
    auth : authReducer,
    product: productReducer,
    cart: cartReducer
});

export type RootState = ReturnType<typeof rootReducer>;