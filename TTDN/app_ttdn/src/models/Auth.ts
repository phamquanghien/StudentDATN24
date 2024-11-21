export type AuthType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type AuthResponseLoginType = {
  name: string;
  token: string;
  userId: string;
  email: string;
};

export type ActiveType = {
  email: string;
};

export type OtpType = {
  email: string;
  otp: string;
};
