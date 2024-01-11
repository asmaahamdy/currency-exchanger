import { Injectable } from '@angular/core';
import { Currency } from '../currency';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CurencyService {
  private data = new Subject<any>();
  data$ = this.data.asObservable();
  private currencies: Currency[] = [];

  constructor(private http: HttpClient) { }

  public getCurrencies() {
    return this.currencies;
  }

  setData(data: any) {
    this.data.next(data);
  }

}
