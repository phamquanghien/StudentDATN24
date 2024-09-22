export type AuthType = {
  user: string;
  pass: string;
};

export type AuthResponseLoginType = {
  success: boolean;
  message: string;
  token: string;
};

export type ActiveType = {
  email: string;
};

export type OtpType = {
  email: string;
  otp: string;
};
