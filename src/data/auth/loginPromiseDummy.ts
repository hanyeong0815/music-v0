import UserDummy from "../../models/UserDummy"

const getLoginPromiseDummy = (otp: string, userName:string) =>
    new Promise<{ data: UserDummy }>((resolve, reject) => {
        const userDummy = {
            userName,
            fullName: "고한영",
            nickName: "여하두",
        };

        const hasCorrectOTP = (() => {
            const correctOTP = (window as any).DB_DUMMY.otpMap[userName];
            const correct = otp === correctOTP;
            if (correct) {
                delete (window as any).DB_DUMMY.otpMap[userName];
            }
            return correct;
        })();

        console.debug(
            "otp >>> ",
            otp,
            "uesrName >>> ",
            userName,
            "has correct OTP >>> ",
            hasCorrectOTP
        );

        if(!hasCorrectOTP) {
            const error = new Error(`OTP not correct.`);
            reject(error);
            return;
        }

        const responseDummy = { data: { ...userDummy }};
        resolve(responseDummy);
    });

    export default getLoginPromiseDummy;