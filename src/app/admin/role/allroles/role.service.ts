import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { catchError  } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Role, RoleDto} from "./role.model";
import { environment } from "src/environments/environment";

@Injectable()
export class RoleService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = environment.apiUrl;
  constructor(private httpClient: HttpClient) {
    super();
  }

  addRole(role: Role): Observable<any> {
    return this.httpClient.post<any>(this.API_URL + 'roles', role);
  }

  updateRole(id: string, role: Role): any {
    return this.httpClient.put<any>(`${this.API_URL}role?id=${id}`, role);
  }

  getEditRole(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}roles/${id}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  deleteRole(id: number): any {
    return this.httpClient.delete(`${this.API_URL}roles?id=${id}`);
  }

  getDropDownRole():any {
    return this.httpClient.get(`${this.API_URL}role/getdropdownlis`);
  }
}
