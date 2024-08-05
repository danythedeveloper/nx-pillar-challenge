import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from '../store/auth/auth.state';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  //Get token from store
  const store = inject(Store);
  const token = store.selectSnapshot(AuthState.token);

  //Define the public endpoints
  const publicEndPoints = ['/login', '/register'];
  const isPublic = publicEndPoints.some((url) => req.url.includes(url));
  if (!isPublic && token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
