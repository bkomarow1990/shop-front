import axios from "axios";

//import { LogOut } from "./../../components/auth/login/actions";
import { store } from "../../store/configureStore";
import { refresh } from "../refresh";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
  (configuration: any) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      if (configuration.headers) {
        configuration.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return configuration;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      (error.response.status === 404 || error.response.status === 500) &&
      error.config.url ===
        process.env.REACT_APP_SERVER_URL + "api/Account/refresh-token"
    ) {
      //store.dispatch(LogOut());
    }

    if (error.response.status === 401 && !error.config._retry) {
      error.config._retry = true;

      try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        const result = await refresh(accessToken, refreshToken);

        const newAccessToken = result.jwtToken;
        const newRefreshToken = result.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        return axios.request(error.config);
      } catch (internalError) {
        return Promise.reject(internalError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;