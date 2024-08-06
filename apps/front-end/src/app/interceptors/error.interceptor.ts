import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, of, tap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  //Inject prime message Service to handle UI warnings and errors.
  const messageService = inject(MessageService);
  return next(req).pipe(
    catchError((apiError: HttpErrorResponse) => {
      console.log('Error detected', apiError);
      console.error(apiError);
      messageService.add({
        severity: 'error',
        summary: apiError.error.message,
        life: 3000,
      });
      //Preventing the stream line to stop by using of();
      return of();
    })
  );
};
