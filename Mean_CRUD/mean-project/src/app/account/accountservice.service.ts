import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accountinfo } from './accountinfo';

@Injectable({
  providedIn: 'root'
})
export class AccountserviceService {
  private url = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  createaccount(accinfo: Accountinfo): Observable<Accountinfo> {
    return this.http.post<Accountinfo>(this.url + 'register', accinfo);
  }

  getUsers(): Observable<Accountinfo[]> {
    return this.http.get<Accountinfo[]>(this.url + 'users');
  }

  getUserById(userId: string): Observable<Accountinfo> {
    return this.http.get<Accountinfo>(`${this.url}users/${userId}`);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.url}users/${userId}`);
  }

  updateAccount(userId: string, accinfo: Accountinfo): Observable<Accountinfo> {
    return this.http.put<Accountinfo>(`${this.url}users/${userId}`, accinfo);
  }
}
