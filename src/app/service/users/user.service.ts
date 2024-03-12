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

  findAll(pageNumber: number, pageSize: number): Observable<IPage<IUser>> {
    return this.http.get<IPage<IUser>>('http://localhost:8080/users', {params: {pageNumber, pageSize}});
  }
}
