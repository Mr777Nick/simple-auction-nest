import { ThrottlerException, ThrottlerGuard } from '@nestjs/throttler';

export class ItemBidLimitGuard extends ThrottlerGuard {
  protected throwThrottlingException(): void {
    throw new ThrottlerException('Please wait before placing another bid');
  }
}
