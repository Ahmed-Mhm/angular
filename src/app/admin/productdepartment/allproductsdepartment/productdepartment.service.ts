import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, Subject } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Productdepartment, ProductdepartmentDto} from "./productdepartment.model";
import { environment } from "src/environments/environment";
@Injectable()
export class ProductdepartmentService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = environment.apiUrl;
  constructor(private httpClient: HttpClient) {
    super();
  }

  addProductdepartment(productdepartment: Productdepartment): Observable<any> {
    return this.httpClient.post<any>(this.API_URL + '/v1/productdepartment/', productdepartment);
  }

  updateProductdepartment(id: string, productdepartment: Productdepartment): any {
    return this.httpClient.put<any>(`${this.API_URL}/v1/productdepartment?id=${id}`, productdepartment);
  }

  getEditProductdepartment(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/v1/productdepartment/${id}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  deleteProductdepartment(id: number): any {
    return this.httpClient.delete(`${this.API_URL}/v1/productdepartment?id=${id}`);
  }

  getDropDownProductdepartment():any {
    return this.httpClient.get(`${this.API_URL}/v1/productdepartment/getdropdownlis`);
  }
}
