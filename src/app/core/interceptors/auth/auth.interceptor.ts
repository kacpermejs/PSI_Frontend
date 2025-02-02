import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CognitoService } from '@core/services/cognito/cognito.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cognitoService = inject(CognitoService);

  return from(cognitoService.getToken()).pipe(
    switchMap(token => {
      const authReq = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;
      return next(authReq);
    })
  );
};
