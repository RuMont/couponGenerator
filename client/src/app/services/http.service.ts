import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /**
   * Checks if the server is up and fetches config data
   * @returns config data from server
   */
  checkStatus(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.apiUrl, { observe: 'response'});;
  }

  /**
   * Generates incremental coupon values
   * @param data data to the server
   * @returns an array of coupon values
   */
  generateSequencedCoupons(data: {valueLength: number, startValue?: number}): Observable<HttpResponse<string[]>> {
    return this.http.post<any>(this.apiUrl + "/generate", data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  /**
   * Generates random coupon values
   * @param data data to the server
   * @returns an array of coupon values
   */
  generateRandomCoupons(data: {valueLength: number}): Observable<HttpResponse<string[]>> {
    return this.http.post<any>(this.apiUrl + "/generate", data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  /**
   * Sets new config data in the server and returns it back to the client
   * @param data config data to the server
   * @returns new config data
   */
  sendNewConfig(data: {}) {
    return this.http.post<any>(this.apiUrl + "/config", data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }
}
