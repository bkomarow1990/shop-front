import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/configureStore';
import { setAuthUserByToken } from './components/auth/login/actions';

let accessToken = localStorage.accessToken;
let refreshToken = localStorage.refreshToken;
if(accessToken && refreshToken){
  setAuthUserByToken(accessToken, refreshToken, store.dispatch);
}
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
