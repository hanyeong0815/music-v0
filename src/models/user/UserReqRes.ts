export type Gender = "M" | "F";

export default interface UserReqRes {
  usr_id: number | null | undefined;
  username: string | null | undefined;
  full_name: string | null | undefined;
  nickname: string | null | undefined;
  email: string | null | undefined;
  phone_num: string | null | undefined;
  gender: Gender | null | undefined;

  access_token: string | null | undefined;
  refresh_token: string | null | undefined;
  expired_in: number | null | undefined;
  refresh_expired_in: number | null | undefined;
  token_type: string | null | undefined;

  password: string | null | undefined;

  state: {
    password?: string;
  };
}
