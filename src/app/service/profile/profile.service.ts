import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<string[]> {
    const url = `${environment.apiUrl}/profiles`;
    return this.http.get<string[]>(url);
  }
}
