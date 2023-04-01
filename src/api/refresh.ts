import instance from "./configurations";

export const refresh = async (token: any, refreshToken: any) => {
  if (!token || !refreshToken) {
    return null;
  }

  let response = await instance.post(process.env.REACT_APP_SERVER_URL + "api/auth/refresh-token", refreshToken);

  return response.data;
};