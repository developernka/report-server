import { ErrorService } from './../../services/error/error.service';
import { ApiService } from './../../services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  statusList = [];
  cacheStatus = {
    status: 'latest',
    path: ''
  };
  constructor(
    public api: ApiService,
    public err: ErrorService,
    public router: Router
  ) {
    //api.cache.subscribe(cache => (this.cacheStatus = cache));
  }

  ngOnInit() {
    this.api.get('status').subscribe(resp => {
      this.statusList = resp.data;
      console.log(resp);
    });
  }
  getInfo(e) {
    console.log(e.target.parentNode.id);
    this.api
      .get('status/' + e.target.parentNode.id)
      .subscribe(data => console.log(data));
  }
  refresh() {
    this.api.get(this.cacheStatus.path);
  }
}
