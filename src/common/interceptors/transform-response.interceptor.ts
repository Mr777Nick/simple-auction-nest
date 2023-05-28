import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseTransformationInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        if (data) {
          const { message, ...rest } = data;

          return {
            statusCode: context.switchToHttp().getResponse().statusCode,
            message: message || null,
            data:
              typeof data === 'string'
                ? data
                : Array.isArray(data) && data.length === 0
                ? []
                : Object.keys(rest).length === 0
                ? null
                : rest,
          };
        }

        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: null,
          data: null,
        };
      }),
    );
  }
}
