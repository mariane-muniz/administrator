import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Config } from 'protractor';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: String;

  constructor(private httpClient: HttpClient) {
    this.currentUser = localStorage.getItem('access_token');
  }

  public get currentUserValue() {
    return this.currentUser;
  }

  login(username: string, password: string): Observable<HttpResponse<Config>> {

    let loginPath: string = "" + environment.serverUrl
      + environment.apiPath + environment.authPath + "login";

    return this.httpClient.post(
      loginPath,
      { username, password }, 
      { observe: 'response' }
    );
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}
