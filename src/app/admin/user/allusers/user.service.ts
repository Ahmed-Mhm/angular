import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, Subject } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { User, UserDto} from "./user.model";
import { environment } from "src/environments/environment";
@Injectable()
export class UserService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = environment.apiUrl;
  constructor(private httpClient: HttpClient) {
    super();
  }

  addUser(user: User): Observable<any> {
    return this.httpClient.post<any>(this.API_URL + 'users', user);
  }

  updateUser(id: string, user: User): any {
    return this.httpClient.put<any>(`${this.API_URL}users?id=${id}`, user);
  }

  getEditUser(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}users/${id}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  deleteUser(id: number): any {
    return this.httpClient.delete(`${this.API_URL}users?id=${id}`);
  }

  getDropDownUser():any {
    return this.httpClient.get(`${this.API_URL}users/getdropdownlis`);
  }
}
