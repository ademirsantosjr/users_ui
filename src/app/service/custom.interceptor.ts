import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { TokenData } from '../model/tokendata';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { LoginService } from './login/login.service';
import { constants } from '../constants/constants';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacaoDialogComponent } from '../dialog/confirmacao.dialog/confirmacao.dialog.component';
import { Router } from '@angular/router';
import { InfoDialogComponent } from '../dialog/info.dialog/info.dialog.component';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService);
  const dialog = inject(MatDialog);
  const router = inject(Router);

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
      if (error.status === 401) {
        dialog.open(ConfirmacaoDialogComponent, {
          data: {
            title: 'A sessão expirou!',
            message: '<p>Deseja permanecer logado?</p>'
          }
        })
        .afterClosed().subscribe((stayLogged: boolean) => {
          if (stayLogged) {
            loginService.$refreshToken.next(true)
          } else {
            localStorage.removeItem(`${constants.localStorage.tokenDefinition}`);
            router.navigateByUrl(`/${constants.path.loginPage}`);
          }
        })
      }
      if (error.status === 403) {
        dialog.open(InfoDialogComponent, {
          data: {
            title: 'Operação não Autorizada!',
            message: `
              <p>Entre em contato com o Administrador do Sistma.</p>
            `
          }
        });
      }
      return throwError(() => error);
    })
  );
};
