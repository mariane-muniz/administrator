import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataTestService {

  constructor(private httpClient: HttpClient) { }

  getData(fileName: string): Observable<any> {
    return this.httpClient.get('./assets/testfiles/' + fileName);
  }

  getRemoteData(path: string): Observable<any> {
    return this.getRemoteDataWithParams(path, null);
  }
  getRemoteDataWithParams(path: string, params): Observable<any> {
    let url: string = 
      environment.serverUrl
      + environment.apiPath 
      + environment.backendPath
      + path;
      // + '?sort=updatedAt&updatedAt.dir=desc';
    console.info("get", path);
    return this.httpClient.get(url, {params: JSON.parse(JSON.stringify(params))});
  }

  postRemoteData(json: string, entity: string): Observable<any> {
    let url: string = 
      environment.serverUrl
      + environment.apiPath 
      + environment.backendPath
      + 'form/' + entity;
    console.info("post", url);
    return this.httpClient.post(url, json);
  }

  putRemoteData(json: string, entity: string, code: string): Observable<any> {
    let url: string = 
      environment.serverUrl
      + environment.apiPath 
      + environment.backendPath
      + 'form/' + entity + '/' + code;
    console.info("put", url, json);
    return this.httpClient.put(url, json);
  }

  deleteRemoteData(entity: string, code: string): Observable<any> {
    let url: string = 
      environment.serverUrl
      + environment.apiPath 
      + environment.backendPath
      + 'form/' + entity + '/' + code;
    console.info("delete", url);
    return this.httpClient.delete(url);
  }
}