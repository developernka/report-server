import { ApiService } from './../../services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username = '';
  constructor(
    public router: Router,
    public auth: AuthService,
    public api: ApiService
  ) { }

  ngOnInit() {
    this.auth.user.subscribe(user => (this.username = user.username));
  }
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
  login() {
    this.auth.login();
  }

  refresh() {
    this.api.refresh();
  }
}
