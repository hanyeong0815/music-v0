export type Gender = "M" | "F";

export default interface SignupDto {
    name: string | null | undefined;
    gender: Gender | null | undefined;
    userName: string | null | undefined;
    password: string | null | undefined;
    nickname: string | null | undefined;
    email: string | null | undefined;
    signupChk: boolean | null | undefined;
}