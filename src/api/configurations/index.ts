import axios, { AxiosError } from "axios";
import { LogoutUser } from "../../components/auth/login/actions";

//import { LogOut } from "./../../components/auth/login/actions";
import { store } from "../../store/configureStore";
import { refresh } from "../refresh";

type RequestQueueItem = {
  config: any;
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
};

let isRefreshing = false;
let failedQueue: RequestQueueItem[] = [];

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: { "Content-Type": "application/json" },
});

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(instance(prom.config));
    }
  });

  failedQueue = [];

  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

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
      (error.response.status === 400 || error.response.status === 404 || error.response.status === 500) &&
      error.config.url ===
        process.env.REACT_APP_SERVER_URL + "api/Account/refresh-token"
    ) {
      store.dispatch(LogoutUser());
    }

    if (error.response.status === 401 && !error.config._retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        const refreshToken = localStorage.getItem("refreshToken");

        try {
          const result = await refresh(refreshToken);

          const newAccessToken = result.jwtToken;
          const newRefreshToken = result.refreshToken;

          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          processQueue(null, newAccessToken);
        } catch (internalError) {
          processQueue(internalError as any, null);
        } finally {
          isRefreshing = false;
        }
      }

      const retryRequest = new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject, config: error.config });
      });

      return retryRequest;
    }

    return Promise.reject(error);
  }
);

export default instance;