import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../model/user';
import { IPage } from '../../dto/pageusers';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  save(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.apiUrl}/users`, user);
  }

  findAll(pageNumber: number, pageSize: number): Observable<IPage<IUser>> {
    const url = `${environment.apiUrl}/users`;
    const params = {params: {pageNumber, pageSize}};
    return this.http.get<IPage<IUser>>(url, params);
  }

  findByUsernameOrEmail(usernameOrEmail: string, pageNumber: number, pageSize: number): Observable<IPage<IUser>> {
    const url = `${environment.apiUrl}/users/find-by-username-or-email/${usernameOrEmail}`;
    const params = {params: {pageNumber, pageSize}};
    return this.http.get<IPage<IUser>>(url, params);
  }

  updateByName(user: IUser, name: string): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/users/${name}`, user);
  }

  deleteByUsername(username: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/users/${username}`);
  }
}
