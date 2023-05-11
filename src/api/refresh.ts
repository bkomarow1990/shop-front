import instance from "./configurations";

export const refresh = async (refreshToken: string | null) => {
  if (!refreshToken) {
    return null;
  }

  let response = await instance.post(process.env.REACT_APP_SERVER_URL + "api/Account/refresh-token", refreshToken);

  return response.data;
};