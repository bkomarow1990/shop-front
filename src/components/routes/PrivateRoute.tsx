import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isAuth, children } : any) => {
  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;