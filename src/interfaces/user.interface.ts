import { AccessAndRefreshTokens, IRegister } from './auth.interface';

export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
}

export interface ICreateUser extends IRegister {
  role: Roles;
}

export interface IUser {
  username: string;
  email: string;
  role: 'user' | 'admin';
  isEmailVerified: boolean;
  lotteryPoints: number;
  wallet: any[];
  wishList: string[];
  lottoSpent: number;
  referralReceived: boolean;
  referralCode: string;
  createdAt: string;
  updatedAt: string;
  wallets: Wallet[];
  id: string;
  resetPasswordEmail?: string;
}

export interface Wallet {
  name: string;
  address: string;
  isDefault: boolean;
  _id: string;
}

export interface IUserWithTokens {
  user: IUser;
  tokens: AccessAndRefreshTokens;
}

export interface LinkWalletBody {
  message: string;
  signature: string;
  name?: string;
  isDefault?: boolean;
}
