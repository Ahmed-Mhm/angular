import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpRequest } from "@angular/common/http";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError, map, retry } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { id } from "@swimlane/ngx-datatable";
import { TokenRespones } from "src/app/authentication/TokenResponese.model";
import { authenticationResponse, User } from "../models/user";

@Injectable({
  providedIn: "root",
})

export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private readonly tokenKey: string = 'token';
  private readonly refreshtokenkey: string = 'refreshToken';
  private readonly refreshTokenExpiryTime: string = 'token-expiration';
  private readonly role = "role";
  Permissions: string[] = [];
  private apiURL = environment.apiUrl + 'tokens'
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    const user: User =
    {
      userId: this.currentUserSubject.value.userId,
      imageUrl: this.currentUserSubject.value.imageUrl,
      fullName: this.currentUserSubject.value.fullName,
      role: "Admin",
      token: this.getToken(),
    }
    return user;
  }

  async saveToken(authentication: authenticationResponse) {
    localStorage.setItem(this.tokenKey, authentication.token);
    localStorage.setItem(this.refreshtokenkey, authentication.refreshToken);
    localStorage.setItem(this.refreshTokenExpiryTime, authentication.refreshTokenExpiryTime);
    localStorage.setItem("userId", authentication.userId);
  }

  create(phoneNumber: string, password: string) {
    this.logout();
    return this.http.post<any>(this.apiURL, { phoneNumber, password });
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }


  GenerateRefreshToken(token: string, refreshToken: string) {
    console.log("refreshToken" + refreshToken);
    return this.http
      .post<any>(`${environment.apiUrl}tokens/refresh`, {
        token,
        refreshToken
      })
      .pipe(
        map((user) => {
          localStorage.setItem("currentUser", JSON.stringify(user.data));
          this.saveToken(user.data);
          this.currentUserSubject.next(user);
          localStorage.setItem("imageUrl", user.data.imageUrl);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshtokenkey);
    localStorage.removeItem(this.refreshTokenExpiryTime);
    localStorage.removeItem(this.role);
    localStorage.removeItem("userId");
    localStorage.removeItem("imageUrl");
    localStorage.removeItem("Permissions");
    this.currentUserSubject.next(null);
    return of({ success: false });
  }
}
