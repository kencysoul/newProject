import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http : HttpClient) { }

  fetchData(): Observable<any>{
    return this.http.get<any>('https://api.publicapis.org/entries');
  }
}
