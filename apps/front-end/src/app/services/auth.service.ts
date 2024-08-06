import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authApi = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.authApi}/login`, {
      email: email,
      password,
    });
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.authApi}/register`, {
      email: email,
      password,
    });
  }
}
