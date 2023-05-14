import Cookiemanager from "@utils/common/storage/Cookie";
import axios from "axios";

// url 호출 시 기본 값 셋팅
const api = axios.create({
  baseURL: "http://localhost:3030/",
  headers: { "Content-type": "application/json" }, // data type
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    const accessToken = Cookiemanager.getCookie("accessToken");
    const refreshToken = Cookiemanager.getCookie("refreshToken");

    if (config.headers && accessToken && refreshToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
      config.headers.refreshToken = `Bearer ${refreshToken}`;
      return config;
    }
    // Do something before request is sent
    console.log("request start", config);
  },
  function (error) {
    // Do something with request error
    console.log("request error", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("get response", response);
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) {
      if (error.response.data.message === "expired") {
        const originalRequest = config;
        const refreshToken = await localStorage.getItem("refreshToken");
        // token refresh 요청
        const { data } = await axios.post(
          `http://localhost:8080/refresh`, // token refresh api
          {},
          { headers: { authorization: `Bearer ${refreshToken}` } }
        );
        // 새로운 토큰 저장
        // dispatch(userSlice.actions.setAccessToken(data.data.accessToken)); store에 저장
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data;
        await Cookiemanager.setCookie("accessToken", newAccessToken);
        await Cookiemanager.setCookie("refreshToken", newRefreshToken);
        originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return axios(originalRequest);
      }
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("response error", error);
    return Promise.reject(error);
  }
);

export default api;
