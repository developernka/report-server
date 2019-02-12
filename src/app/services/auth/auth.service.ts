import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<any> = new BehaviorSubject<any>({ username: "" });
  constructor(public http: HttpClient) { }

  login() {
    this.http.post('api/auth', { username: "nka", password: "nka" }).subscribe(user => this.user.next(user));
  }
}
