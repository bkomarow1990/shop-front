import { combineReducers } from 'redux';
import { productReducer } from '../../components/auth/home/reducer';
import { authReducer } from "../../components/auth/login/reducer";
import { cartReducer } from '../../components/cart/reducer';
import { themeReducer } from '../../styles/redux/reducer';
import { adminUserReducer } from '../../components/adminPanel/users/UsersList/reducer';
import { adminCategoryReducer } from '../../components/adminPanel/categories/reducer';
export const rootReducer = combineReducers({
    auth : authReducer,
    product: productReducer,
    cart: cartReducer,
    theme: themeReducer,
    adminUser: adminUserReducer,
    adminCategory: adminCategoryReducer 
});

export type RootState = ReturnType<typeof rootReducer>;