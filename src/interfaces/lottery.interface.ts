import { IUser } from './user.interface';

export interface ICreateLottery {
  name: string;
  description: string;
  thumbnail: string;
  ticketPrice: number;
  maxTickets: number;
  operatorCommissionPercentage: number;
  minTicketsBeSold: number;
  prize: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBuyer {
  userId: string;
  ticketCount: number;
}

export type LotteryWinner = {
  userId: {
    username: string;
  };
  ticket: string;
  _id: string;
};

interface TicketBuyer {
  userId: string;
  username: string;
  tickets: string[];
  _id: string;
}

export enum LOTTERYSTATUS {
  LIVE = 'live',
  UPCOMING = 'upcomming',
  ENDED = 'ended',
}

export interface ILotteryRes extends ICreateLottery {
  id: string;
  winner?: LotteryWinner;
  isRefunded: boolean;
  isClosed: boolean;
  isWished: boolean;
  totalTicketsSold: number;
  ticketBuyers: TicketBuyer[];
  status: LOTTERYSTATUS;
}

export interface IOfferRes {
  title: string;
  subtitle: string;
  description: string;
  lottery: ILotteryRes;
  banner: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface ILotteryResWithResult {
  results: ILotteryRes[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export interface ILotteryStat {
  _id: string;
  totalTicketsSaleAmountInLP: number;
  totalTicketsSaleAmountInUSDT: number;
  totalTicketsRefundAmountInLP: number;
  totalTicketsRefundAmountInWei: number;
}

export interface ILotteryStatWithLottery {
  lottery: ILotteryRes;
  lotteryStatsFromTxn: ILotteryStat;
}
