import authInfo from "@models/auth/dto/AuthInfo";
import ContextCallbackOption from "@models/auth/dto/common/api/ContextCallbackOption";
import StorageManager from "@utils/common/storage";
import create from "zustand";
import UserReqRes from "@models/user/UserReqRes";
import axios from "axios";
import LoginRes from "@models/user/LoginDto";
import userInfoReqRes from "@models/auth/dto/UserInfoReqRes";
import Cookiemanager from "@utils/common/storage/Cookie";

interface AuthState {
  authUser: UserReqRes | null | undefined;
  isAuthenticated: boolean;
  token: string | null | undefined;
  username: string | null | undefined;

  authInfo: authInfo;
  userInfo: userInfoReqRes;
  otp: string;
  loginStatus: string;
  // userInfo: userInfoReqRes;

  setAuthInfo: (authInfo: authInfo) => void;
  setOTP: (otp: string) => void;

  login: (authData: Partial<UserReqRes> | { code: string }) => void;
  logout: (option?: ContextCallbackOption) => void;

  setUserInfo: (userInfo: LoginRes) => void;

  toggleAuthDummy: () => void;
}

const useAuth = create<AuthState>((set, get) => ({
  authUser: null,
  isAuthenticated: StorageManager.getItem("username") != null ?? false,
  loginStatus:
    StorageManager.getItem("username") != null ? "login_success" : "누르기전",

  authInfo: {
    userName: "",
    password: "",
  },
  otp: "",
  token: Cookiemanager.getCookie("accessToken"),
  username: StorageManager.getItem("username") ?? "",

  userInfo: {
    username: "",
    token: "",
    userId: "",
    nickname: "",
    gender: "",
    email: "",
  },

  setAuthInfo: (authInfo) => set({ authInfo }),
  setOTP: (otp) => set({ otp }),

  login: (authData) => {
    set(() => ({ loginStatus: "결과 확인" }));

    console.log("autoData", authData);
    const isValid =
      ["username", "state"].every((requiredKeyName) =>
        Object.keys(authData).includes(requiredKeyName)
      ) &&
      ["password"].every((requiredKeyName) =>
        Object.keys((authData as Partial<UserReqRes>)?.state!).includes(
          requiredKeyName
        )
      );

    if (!isValid) {
      set(() => ({ loginStatus: "흠" }));
      console.log("여기??");
      return;
    }

    let loginPromise = null;

    const url = "http://localhost:8080/login";
    const username = (authData as Partial<UserReqRes>).username!;
    const password = (authData as Partial<UserReqRes>).state?.password ?? "";
    if (!username || !password) {
      console.log("여기여기여기 A");
      setTimeout(() => set(() => ({ loginStatus: "EMPTY" })), 0);
      return;
    }
    console.log("여기여기여기 B");

    loginPromise = axios.post(url, {
      username,
      password,
    });

    loginPromise
      .then((response) => response.data)
      .then((loginDto: LoginRes) => {
        const { usr_id, access_token } = loginDto;
        if (!usr_id) {
          console.log("회원정보 불일치", access_token);
          set({ loginStatus: "흠" });
          return;
        }

        set({
          loginStatus: "login_success",
          token: loginDto.access_token,
          username: loginDto.username,
        });
        set({ isAuthenticated: true });
        StorageManager.setItem("isAuth", "true");
        StorageManager.setItem("userId", `${loginDto.usr_id ?? "0"}`);
        Cookiemanager.setCookie(
          "accessToken",
          `${loginDto.access_token ?? ""}`
        );
        Cookiemanager.setCookie(
          "refreshToken",
          `${loginDto.refresh_token ?? ""}`
        );
        StorageManager.setItem("username", `${loginDto.username ?? ""}`);
      })
      .catch((err) => {
        console.error("\n\n\n\n\n\n", err, "\n\n\n\n\n\n\n\n");
        set({ loginStatus: "흠" });
      });
  },

  logout: (option) => {
    StorageManager.clearAllUnsticky();
    set({ isAuthenticated: false, token: null, username: null });
    option?.success && option.success(true);
  },

  setUserInfo: (userData) => {
    set({
      loginStatus: "login_success",
      token: userData.access_token,
      username: userData.username,
    });
    set({ isAuthenticated: true });
    StorageManager.setItem("isAuth", "true");
    StorageManager.setItem("userId", `${userData.usr_id ?? "0"}`);
    StorageManager.setItem("token", `${userData.access_token ?? ""}`);
    StorageManager.setItem("username", `${userData.username ?? ""}`);
  },

  toggleAuthDummy: () => {
    const state = get();
    set({ isAuthenticated: !state.isAuthenticated });
  },
}));

export default useAuth;
