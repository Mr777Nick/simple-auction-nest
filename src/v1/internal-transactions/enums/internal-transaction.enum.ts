export enum InternalTransactionType {
  DEPOSIT = 'DEPOSIT',
  ITEM_BID = 'ITEM_BID',
  ITEM_BID_REFUND = 'ITEM_BID_REFUND',
  ITEM_SOLD = 'ITEM_SOLD',
}

export enum InternalTransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}
