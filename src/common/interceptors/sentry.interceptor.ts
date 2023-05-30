import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import * as Sentry from '@sentry/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(null, (exception) => {
        if (
          String(context.switchToHttp().getResponse().statusCode).startsWith(
            '5',
          )
        ) {
          Sentry.captureException(exception);
        }
      }),
    );
  }
}
