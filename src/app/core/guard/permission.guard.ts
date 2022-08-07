import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { PermissionService } from "../service/permission.service";
import { Location } from '@angular/common'

@Injectable({
  providedIn: "root",
})
export class PermissionGuard implements CanActivate {
  constructor(private router: Router, private _location: Location,
    private permissionService: PermissionService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
    // if (this.permissionService.IsAuthorized(route.data.permission) == true){
    //   return true;
    // }
    // else {
    //   const currentUrl = this.router.url;
    //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //     this.router.navigate([currentUrl]);
    //   });
    // }
  }
}
