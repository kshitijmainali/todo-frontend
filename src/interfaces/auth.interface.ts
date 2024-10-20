export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  username: string;
  codeReferral?: string;
}

export interface TokenPayload {
  token: string;
  expires: Date;
}

export interface AccessAndRefreshTokens {
  access: TokenPayload;
  refresh: TokenPayload;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}
