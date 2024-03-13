import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../model/user';
import { IPage } from '../../dto/pageusers';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  save(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`http://localhost:8080/users`, user);
  }

  findAll(pageNumber: number, pageSize: number): Observable<IPage<IUser>> {
    const url = 'http://localhost:8080/users';
    const params = {params: {pageNumber, pageSize}};
    return this.http.get<IPage<IUser>>(url, params);
  }

  findByUsernameOrEmail(usernameOrEmail: string, pageNumber: number, pageSize: number): Observable<IPage<IUser>> {
    const url = `http://localhost:8080/users/find-by-username-or-email/${usernameOrEmail}`;
    const params = {params: {pageNumber, pageSize}};
    return this.http.get<IPage<IUser>>(url, params);
  }

  updateByName(user: IUser, name: string): Observable<void> {
    return this.http.put<void>(`http://localhost:8080/users/${name}`, user);
  }

  deleteByUsername(username: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/users/${username}`);
  }
}
