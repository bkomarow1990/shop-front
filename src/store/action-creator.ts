import * as LoginActionCreator from '../components/auth/login/actions';
import * as ProductActionCreator from '../components/auth/home/actions';
import * as CartActionCreator from '../components/cart/actions';
const actions = {
    ...LoginActionCreator,
    ...ProductActionCreator,
    ...CartActionCreator,
}

export default actions;