export type AuthType = {
    email: string;
    password: string;
    rememberMe: boolean;
};

export type AuthResponseLoginType = {
    userName: string;
    token: string;
};

export type ActiveType = {
    email: string;
};

export type OtpType = {
    email: string;
    otp: string;
};
