import UserReqRes from "@models/user/UserReqRes";
export type Gender = "M" | "F";

export default interface LoginRes {
  usr_id: number | null | undefined;
  username: string | null | undefined;
  access_token: string | null | undefined;
  refresh_token: string | null | undefined;
  expired_in: number | null | undefined;
  refresh_expired_in: number | null | undefined;
  token_type: string | null | undefined;
}
