import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  generalGetData(url: string) {
    url = url.indexOf(environment.API_ENDPOINT) > -1 ? url : environment.API_ENDPOINT + url;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', environment.user_token);
    return this.httpClient.get(url, {
      headers: headers,
      responseType: 'json'
    });
  }

  generalPostData(url: string, data: any) {
    url = url.indexOf(environment.API_ENDPOINT) > -1 ? url : environment.API_ENDPOINT + url;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'token ' + environment.user_token);
    return this.httpClient.post(url, data, {
      headers: headers,
      responseType: 'json'
    });
  }

  generalPatchData(url: string, data: any) {
    url = url.indexOf(environment.API_ENDPOINT) > -1 ? url : environment.API_ENDPOINT + url;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'token ' + environment.user_token);
    return this.httpClient.patch(url, data, {
      headers: headers,
      responseType: 'json'
    });
  }
}
