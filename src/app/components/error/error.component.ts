import { ErrorService } from './../../services/error/error.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  src: string = '';
  err: any = {};
  constructor(public errorService: ErrorService) {
    var errObj = errorService.getError();
    this.err = errObj['err'];
    this.src = errObj['src'];
  }

  ngOnInit() {}
}
