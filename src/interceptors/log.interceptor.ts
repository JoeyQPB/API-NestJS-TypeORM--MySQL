import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LogInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const dt = Date.now();

    return next.handle().pipe(
      tap(() => {
        const resquest = context.switchToHttp().getRequest();

        console.log(`URL: ${resquest.url}`);
        console.log(`Method: ${resquest.method}`);

        console.log(`Execução levou: ${Date.now() - dt} ms!`);
      }),
    );
  }
}
