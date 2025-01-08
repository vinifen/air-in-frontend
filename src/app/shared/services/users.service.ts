import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, take} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private result: any;
  private apiURL: string = environment.backendURL;
  private userData$: BehaviorSubject<{username: string} | null> = new BehaviorSubject<{username: string} | null>(null);

  constructor(
    private http: HttpClient,  
  ){}

  requestUser() {
    const response = this.http.get<{status: boolean, data: any}>(`${this.apiURL}users`, {withCredentials: true}).pipe(take(1));
    return response;
  }

  setUserData(newUserData: {username: string}){
    this.userData$.next({username: newUserData.username});
  }

  getUserData(){
    return this.userData$.asObservable();
  }

  postUsers(username: string, password: string): Observable<any> {
    const data = this.http.post(`${this.apiURL}users`, {username, password}, { withCredentials: true } ).pipe(take(1)) 
    return data;
  }
}
