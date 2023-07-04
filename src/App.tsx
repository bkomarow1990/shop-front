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
import UsersList from "./components/adminPanel/users/UsersList/UsersList";
import { UserPageLayout } from "./components/adminPanel/users/UsersList/UserPage/UserPageLayout";
import UserPage from "./components/adminPanel/users/UsersList/UserPage/UserPage";
import { Profile } from "./components/settings/profile/Profile";
import NotFound from "./containers/NotFound/NotFound";
import { CategoriesList } from "./components/adminPanel/categories/CategoriesList/CategoriesList";
import { CategoryCRUD } from "./components/adminPanel/categories/Category/Category";
import { EditCategory } from "./components/adminPanel/categories/Category/EditCategory";
import { AddCategory } from "./components/adminPanel/categories/Category/AddCategory";
import { EditProduct } from "./components/adminPanel/products/EditProduct";
import { CreateProduct } from "./components/adminPanel/products/CreateProduct";
import { AdminProducts } from "./components/adminPanel/products/AdminProducts";

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
            <Route path="/settings/profile" element={<Profile />}></Route>
            <Route index element={<Appearance />} />
          </Route>
          <Route
            path="/cart"
            element={
              <PrivateRoute isAuth={isAuth}>
                <Cart />
              </PrivateRoute>
            }
          />
          {isAuth && roles && roles.includes("Administrator") && (
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
                path="/adminPanel/categories"
                element={
                    <CategoriesList />
                }/>
                <Route
                path="/adminPanel/categories/:id"
                element={
                    <EditCategory/>
                }/>
                <Route
                path="/adminPanel/categories/create"
                element={
                    <AddCategory/>
                }/>
                <Route
                path="/adminPanel/products"
                element={
                    <AdminProducts />
                }/>
                <Route
                path="/adminPanel/products/:id"
                element={
                    <EditProduct/>
                }/>
                <Route
                path="/adminPanel/products/create"
                element={
                    <CreateProduct/>
                }/>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
