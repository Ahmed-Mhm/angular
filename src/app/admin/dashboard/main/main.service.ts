import { retry } from 'rxjs';
import { HomeDto } from '../../../core/DTOs/Home/HomeDto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiUrl + 'v1/reports/homepage'

  getAll(): Observable<any>{
    retry(3);
    return this.http.get<any>(this.apiURL);
  }

  create(){
    return this.http.post(this.apiURL,null);
  }

}
