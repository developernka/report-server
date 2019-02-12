import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  error: any = null;
  src: String = '';
  constructor(public router: Router) {}
  public reportError(err: any, src: string): void {
    this.error = err;
    this.src = src;
    this.router.navigate(['/error']);
  }
  public getError(): any {
    return { err: this.error, src: this.src };
  }
  public clearError(): void {
    this.error = null;
    this.src = '';
  }
}
