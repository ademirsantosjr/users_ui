import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { TokenData } from '../model/tokendata';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { LoginService } from './login/login.service';
import { constants } from '../constants/constants';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService);

  let tokenData: TokenData = new TokenData(); 
  
  const localData: string | null = localStorage.getItem(`${constants.localStorage.tokenDefinition}`);
  
  if (localData != null) {
    tokenData = JSON.parse(localData);
  }
  
  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${tokenData.accessToken}`
    }
  })

  return next(cloneRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        const isRefresh = confirm('A sessão expirou. Deseja permanecer logado?')
        if (isRefresh) {
          loginService.$refreshToken.next(true)
        }
      }
      return throwError(() => error);
    })
  );
};
