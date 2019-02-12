import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'report-server';
  constructor(public http: HttpClient) {

  }
  ngOnInit(): void {
    this.http.get('api/hello/hi').subscribe(resp => console.log(resp))
  }
}
