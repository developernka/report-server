import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

class CacheItem<T> {
  url: string;
  timestampCached: number;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  saveToStorage: boolean = true;
  cache: any = {};
  cacheStatus: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: HttpClient) {
    if (this.saveToStorage) {
      for (var k in sessionStorage) {
        try {
          this.cache[k] = new BehaviorSubject(JSON.parse(sessionStorage[k]));
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  get(path: string, forceRefresh: boolean = false): BehaviorSubject<any> {
    this.cacheStatus.next({ status: "old", path: path });

    if (!this.cache[path]) {
      this.cache[path] = new BehaviorSubject(observer => {
        this.http.get(`/api/${path}`).subscribe(resp => {
          observer.next({ data: resp, ts: Date.now() });
        });
      });
      //this.refresh();
    }
    if (forceRefresh) {
      this.refresh()
    }
    return this.cache[path];
  }

  refresh() {
    var path = this.cacheStatus.value.path;
    this.http.get(`/api/${path}`).subscribe(resp => {
      var data = { data: resp, ts: Date.now() }
      this.cache[path].next(data);
      if (this.saveToStorage) {
        sessionStorage[path] = JSON.stringify(data);
      }
    });
  }
}
