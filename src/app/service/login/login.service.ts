import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenData } from '../../model/tokendata';
import { Observable, Subject } from 'rxjs';
import { Login } from '../../model/login';
import { IRefreshToken } from '../../model/refreshtoken';
import { environment } from '../../../environments/environment.development';
import { constants } from '../../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private urlSignin: string = `${environment.apiUrl}/auth/signin`;
  private urlRefreshToken: string = `${environment.apiUrl}/auth/refresh`;

  public $refreshToken = new Subject<boolean>;
  public $tokenRefreshed = new Subject<boolean>;

  private http: HttpClient;

  constructor(private handler: HttpBackend) {
    this.http = new HttpClient(handler);
    this.$refreshToken.subscribe((res: any) => {
      this.refreshToken()
    });
  }

  authenticate(credentials: Login): Observable<TokenData> {
    const url = this.urlSignin;
    return this.http.post<TokenData>(url, credentials)
  }

  refreshToken(): void {
    const url = this.urlRefreshToken;
    this.http.put<TokenData>(url, this.getRefreshToken())
      .subscribe({
        next: ((res: TokenData) => {
          localStorage.setItem(`${constants.localStorage.tokenDefinition}`, JSON.stringify(res));
          this.$tokenRefreshed.next(true);
        })
      });
  }

  private getRefreshToken(): IRefreshToken {

    let tokenData: TokenData = new TokenData(); 
  
    const localData: string | null = localStorage.getItem(`${constants.localStorage.tokenDefinition}`);
    
    if (localData != null) {
      tokenData = JSON.parse(localData);
    }
    
    const refreshToken: IRefreshToken = {
      username: tokenData.username,
      refreshToken: tokenData.refreshToken
    }

    return refreshToken;
  }
}
