import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTestService {

  constructor(private httpClient: HttpClient) { }

  getData(fileName: string): Observable<any> {
    return this.httpClient.get('./assets/testfiles/' + fileName);
  }
}
