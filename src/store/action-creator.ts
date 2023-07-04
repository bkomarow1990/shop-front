import * as LoginActionCreator from '../components/auth/login/actions';
import * as ProductActionCreator from '../components/auth/home/actions';
import * as CartActionCreator from '../components/cart/actions';
import * as ThemeActionCreator from '../styles/redux/actions';
import * as AdminUserActionCreator from '../components/adminPanel/users/UsersList/actions';
import * as AdminCategoryActionCreator from '../components/adminPanel/categories/actions';
const actions = {
    ...LoginActionCreator,
    ...ProductActionCreator,
    ...CartActionCreator,
    ...ThemeActionCreator,
    ...AdminUserActionCreator,
    ...AdminCategoryActionCreator
}

export default actions;