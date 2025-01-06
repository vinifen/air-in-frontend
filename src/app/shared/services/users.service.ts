import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { firstValueFrom, map, Observable, take, tap } from 'rxjs';
import { RequestSessionTokenService } from './request-session-token.service';
import { IsLoggedService } from './is-logged.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private result: any;
  private apiURL: string = environment.backendURL;

  constructor(
    private http: HttpClient,  
    private requestNewSessionToken: RequestSessionTokenService,
    private isLogged: IsLoggedService
  ){}
    
  getUser(): Observable<any> {
    console.log("asdfasdASDFAS");
    return this.http.get(`${this.apiURL}users`, {withCredentials: true}).pipe(take(1), tap({
      next: async (response: any) => {
        console.log(response)
        if (response.status === false || response.data.sessionTokenStatus === false) {
          this.isLogged.setIsLogged(false);
          
          if(response.data.hasRefreshToken == true){
            const result = await this.handleNewSessionToken();
            
            if(result == true){
              console.log("AQUI")
              this.fetchGetUserAgain();
              this.isLogged.setIsLogged(true);
            }
          }
        }else{ this.isLogged.setIsLogged(true) }
      },
      error: (err: any) => {
        console.error("Error fetching user data:", err);
        this.isLogged.setIsLogged(false);
      }
    }));
  }

  private async fetchGetUserAgain() {
    try {
      await firstValueFrom(this.getUser());
    } catch (error) {
      console.log(error);
    }
  }

  

  private async handleNewSessionToken() {
    const result = await firstValueFrom(this.requestNewSessionToken.requestSessionToken())
   
    const response: boolean = result.status;
    console.log(response, "AAAAAAAAAA");
    return response;
  }

  postUsers(username: string, password: string): Observable<any> {
    const data = this.http.post(`${this.apiURL}users`, {username, password}, { withCredentials: true } ).pipe(
      take(1), tap({
        next: (value: any) => {
          this.isLogged.setIsLogged(value.status);
        },
        error: (err: any) => {
          this.isLogged.setIsLogged(err.error.status);
        }
      })
    );
    return data;
  }
}
