import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, tap } from 'rxjs';
import { LoginForm, LoginResponse } from './login.types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _user: ReplaySubject<LoginResponse> =
    new ReplaySubject<LoginResponse>(1);

  constructor(private _httpClient: HttpClient) {}

  set user(value: LoginResponse) {
    this._user.next(value);
    // Without encryption version
    localStorage.setItem('_info', JSON.stringify(value));
  }

  get user$(): Observable<LoginResponse | null> {
    const existsUserData = localStorage.getItem('_info');
    if (!existsUserData) return of(null);
    return this._user.asObservable();
  }

  login(data: LoginForm): Observable<LoginResponse> {
    return this._httpClient.post<LoginResponse>(
      'https://dummyjson.com/auth/login',
      data,
    );
  }
}
