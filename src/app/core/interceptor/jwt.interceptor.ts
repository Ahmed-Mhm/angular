import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { BehaviorSubject, catchError, filter, Observable, retry, switchMap, take, throwError } from "rxjs";
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService, private router: Router) { }
  lang = localStorage.getItem("lang");
  // refreshTokenInProgress = false;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    // add authorization header with jwt token if available
    // let currentUser = this.authenticationService.getToken();
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      if (!request.url.includes('/tokens/refresh')) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }

      //request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
      if (!request.headers.has('Accept')) {
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
      }
      request = request.clone({ headers: request.headers.set('Accept-Language', localStorage.getItem("lang")) });
      request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') });
      request = request.clone({ headers: request.headers.set('Access-Control-Allow-Credentials', 'true') });
    }

    return next.handle(request).pipe(catchError(error => {
      console.log(error.status);
      if (error instanceof HttpErrorResponse && !request.url.includes('signin') && error.status === 0) {
        // console.clear();
        return this.handle401Error(request, next);
      }
      return throwError(error);
    }));
  }
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authenticationService.GenerateRefreshToken(localStorage.getItem("token"), localStorage.getItem("refreshToken")).pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.authenticationService.saveToken(token.data);
          localStorage.setItem('token', token.data.token);
          this.refreshTokenSubject.next(token.data.token);
          return next.handle(this.addTokenHeader(request, token.data.token));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.authenticationService.logout().subscribe((res) => {
            if (!res.success) {
              this.router.navigate(["/authentication/signin"]);
            }
          });
          return throwError(err);
        })
      );
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
  }
}

export const jwtInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
};
