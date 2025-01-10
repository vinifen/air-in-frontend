import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, take} from 'rxjs';
import IUserContent from '../interfaces/IUserContent';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private result: any;
  private apiURL: string = environment.backendURL;
  private userData$: BehaviorSubject<IUserContent | null> = new BehaviorSubject<IUserContent | null>(null);

  constructor(
    private http: HttpClient,  
  ){}

  requestUser() {
    const response = this.http.get<{status: boolean, data: any}>(`${this.apiURL}users`, {withCredentials: true}).pipe(take(1));
    return response;
  }

  setUserData(newUserData: IUserContent | null){
    console.log(newUserData, "NEW USER DATA")
    if(!newUserData){
      this.userData$.next(null);
    }else{ 
      this.userData$.next({userID: newUserData.userID, username: newUserData.username});
    }
  }

  getUserData(): Observable<IUserContent | null>{
    return this.userData$.asObservable();
  }

  requestPostUsers(username: string, password: string): Observable<any> {
    const data = this.http.post(
      `${this.apiURL}users`, {username, password}, { withCredentials: true } 
    ).pipe(take(1));
    return data;
  }
}
