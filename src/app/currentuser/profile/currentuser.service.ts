import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { environment } from "src/environments/environment";

import * as countrycitystatejson from 'countrycitystatejson';
@Injectable()
export class CurrentUserService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = environment.apiUrl;
  isTblLoading = true;
  constructor(private httpClient: HttpClient) {
    super();
  }
}
