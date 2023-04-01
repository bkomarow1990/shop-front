import { Route, Link, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./components/auth/login";
import HomeLayout from "./containers";
import RegisterPage from "./components/auth/register";
import HomePage from "./components/auth/home";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { Cart } from "./components/cart/Cart";
import PrivateRoute from "./components/routes/PrivateRoute";

function App() {
  const { isAuth } = useTypedSelector((state) => state.auth);
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route
          path="/cart"
          element={
            <PrivateRoute isAuth={isAuth}>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route index element={<HomePage />}></Route>
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="register" element={<RegisterPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
