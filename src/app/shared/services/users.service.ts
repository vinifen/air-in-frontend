import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiURL: string = environment.backendURL;

  constructor(private http: HttpClient){}
    
  getUsers(): Observable<any> {
    console.log("asdfasdASDFAS");
    const data = this.http.get(`${this.apiURL}users`, {withCredentials: true}).pipe(take(1));

    return data;
  }

  postUsers(username: string, password: string): Observable<any> {
    console.log("asdfasdASDFAS");
    const data = this.http.post(`${this.apiURL}users`, {username, password}, { withCredentials: true } ).pipe(take(1));

    return data;
  }
}
