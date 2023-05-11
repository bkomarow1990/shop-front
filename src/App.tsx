import { Route, Link, Routes } from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./components/auth/login";
import HomeLayout from "./containers";
import RegisterPage from "./components/auth/register";
import HomePage from "./components/auth/home";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { Cart } from "./components/cart/Cart";
import { ConfigProvider, theme, Button, Card } from "antd";
import PrivateRoute from "./components/routes/PrivateRoute";
import { Suspense, useState } from "react";
import { useActions } from "./hooks/useActions";
import { Product } from "./components/auth/home/Product";
import { SettingsNavbar } from "./components/settings/SettingsNavbar";
import { SettingsLayout } from "./containers/SettingsLayout/SettingsLayout";
import { Appearance } from "./components/settings/appearance/Appearance";
import AdminPanelLayout from "./containers/adminPanelLayout/AdminPanelLayout";

function App() {
  const { isAuth, user: {roles} } = useTypedSelector((state) => state.auth);
  const { isDarkTheme } = useTypedSelector((state) => state.theme);
  const { defaultAlgorithm, darkAlgorithm } = theme;
  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="/settings" element={<SettingsLayout />}>
            <Route path="/settings/appearance" element={<Appearance />}></Route>
          </Route>
          <Route
            path="/cart"
            element={
              <PrivateRoute isAuth={isAuth}>
                <Cart />
              </PrivateRoute>
            }
          />
          {isAuth && roles === "Administrator" && (
            <Route
              path="/adminPanel"
              element={
                  <AdminPanelLayout />
              }
            >
              <Route
                path="/adminPanel/users"
                element={
                    <UsersList />
                }
              ></Route>
              <Route
                path="/adminPanel/users/:id"
                element={
                    <UserPageLayout />
                }
              >
                <Route index element={<UserPage />} />
                {/* <Route
                  element={< />}
                  path="/adminPanel/users/:id/transactions"
                /> */}
              </Route>
            </Route>
          )}
          <Route path="/product" element={<Product />} />
          <Route index element={<HomePage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="register" element={<RegisterPage />}></Route>
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
