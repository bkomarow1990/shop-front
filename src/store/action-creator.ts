import * as LoginActionCreator from '../components/auth/login/actions';
import * as ProductActionCreator from '../components/auth/home/actions';
import * as CartActionCreator from '../components/cart/actions';
import * as ThemeActionCreator from '../styles/redux/actions';
import * as AdminUserActionCreator from '../components/adminPanel/users/UsersList/actions';
const actions = {
    ...LoginActionCreator,
    ...ProductActionCreator,
    ...CartActionCreator,
    ...ThemeActionCreator,
    ...AdminUserActionCreator
}

export default actions;