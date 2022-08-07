import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, Subject } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { ProductCategory, ProductCategoryDto} from "./productcategory.model";
import { environment } from "src/environments/environment";
@Injectable()
export class ProductCategoryService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = environment.apiUrl;
  constructor(private httpClient: HttpClient) {
    super();
  }

  addProductCategory(productCategory: ProductCategory): Observable<any> {
    return this.httpClient.post<any>(this.API_URL + '/v1/productCategory/', productCategory);
  }

  updateProductCategory(id: string, productCategory: ProductCategory): any {
    return this.httpClient.put<any>(`${this.API_URL}/v1/productCategory?id=${id}`, productCategory);
  }

  getEditProductCategory(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/v1/productCategory/${id}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  deleteProductCategory(id: number): any {
    return this.httpClient.delete(`${this.API_URL}/v1/productCategory?id=${id}`);
  }

  getDropDownProductCategory():any {
    return this.httpClient.get(`${this.API_URL}/v1/productCategory/getdropdownlis`);
  }
}
