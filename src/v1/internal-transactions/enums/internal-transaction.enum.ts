export enum InternalTransactionType {
  DEPOSIT = 'DEPOSIT',
  ITEM_BID = 'ITEM_BID',
  ITEM_BID_REFUND = 'ITEM_BID_REFUND',
}

export enum InternalTransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}
