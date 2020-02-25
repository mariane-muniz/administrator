import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Link} from '../data/Link';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private mockUrl = 'https://a9944232-df6b-492b-8739-99a09567e697.mock.pstmn.io/';

  constructor(private http: HttpClient) { }

  public getLinks(position: string): Observable<Link[]> {
    const URL = this.mockUrl + position;
    // return this.http.get<Link[]>(URL);
    return new Observable<Link[]>();
  }
}
