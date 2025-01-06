import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, take } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class RequestSessionTokenService {
  private apiURL: string = environment.backendURL;
  constructor(private http: HttpClient) {}

  requestSessionToken(): Observable<any> {
    const data = this.http.post(`${this.apiURL}auth/refresh-token`,{}, { withCredentials: true }).pipe(take(1));
    return data;
  }
}
