export interface ITransaction {
  id: string;
  lotteryPoints: number;
  status: StatusType;
  type: TransactionType;
  fromUserId: string;
  toUserId: string;
  createdAt: string;
  updatedAt: string;
  hash?: string;
  txIndex?: number;
  USDTinWei?: number;
  lottoRate?: number; //Rate of 1 Lotto = USDTinWei/Lotto
  lotteryId?: string;
  numberOfTickets?: number;
  ticketPrice?: number;
  ticket?: string;
  receiverAddress?: string;
  senderAddress?: string;
  discountCoupon?: string;
}

export interface ILotteryWinner {
  userId: string;
  ticket: string;
}
export interface IUserTransaction {
  lotteryPoints: number;
  status: string;
  type: string;
  fromUserId: string;
  toUserId: string;
  lotteryId: {
    name: string;
    description: string;
    thumbnail: string;
    ticketPrice: number;
    maxTickets: number;
    totalTicketsSold: number;
    minTicketsBeSold: number;
    operatorCommissionPercentage: number;
    prize: number;
    startTime: string;
    endTime: string;
    isClosed: false;
    _ticketPrefix: string;
    ticketBuyers: [
      {
        userId: string;
        tickets: string;
        _id: string;
      },
    ];
    _ticketInitialSeed: number;
    createdAt: number;
    updatedAt: number;
    id: number;
    winner?: ILotteryWinner;
  };
  numberOfTickets: number;
  ticketPrice: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

// This is from admin perspective
export enum TransactionType {
  RECHARGE = 'recharge',
  REDEEM = 'redeem',
  TRANSFER = 'transfer',
  BUYTICKET = 'buyticket',
  REFUND = 'refund',
  WIN = 'win',
  REFERRAL = 'referral',
}

//
export enum StatusType {
  SUCCESS = 'success',
  PENDING = 'pending',
  MANUAL_VERIFY = 'manual_verify',
}

export interface RechargeTxn {
  type: TransactionType.RECHARGE;
  lotteryPoints: number;
  hash: string;
  senderAddress: string;
}
