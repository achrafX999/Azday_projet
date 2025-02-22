import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private addBusinessUrl = 'http://127.0.0.1:8000/api/businesses/';

  constructor(private http: HttpClient) {}

  addBusiness(businessData: any): Observable<any> {
    return this.http.post<any>(this.addBusinessUrl, businessData);
  }
}
