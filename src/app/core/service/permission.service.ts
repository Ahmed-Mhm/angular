import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError, map, retry } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { id } from "@swimlane/ngx-datatable";
import { TokenRespones } from "src/app/authentication/TokenResponese.model";
@Injectable({
  providedIn: "root",
})
export class PermissionService {
  Permissions: string[] = [];
  constructor(private http: HttpClient) {
  }

  GetUserPermission(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/roles/${id}/permissions`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  IsAuthorized(claim: string) {
    this.Permissions = JSON.parse(localStorage.getItem("Permissions"));
    if (this.Permissions.indexOf(claim) > -1)
      return true;
    else
      return false;
    // true;
  }

  IsAuthorizedGroup(claim: string[]): boolean {
     this.Permissions =JSON.parse(localStorage.getItem("Permissions"));
      for (var i = 0; i < claim.length; i++) {
        var a;
        if (this.Permissions.indexOf(claim[i]) > -1)
          a = true;
        else
          a = false;
        if (a == false && i == 0) {
          return false;
        }
      }
    return true;
  }

}

