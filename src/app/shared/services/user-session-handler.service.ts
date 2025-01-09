import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UserSessionHandlerService {
  constructor(private authService: AuthService, private userService: UsersService) {}

  async initializeUserSession() {
    const userResponse = await firstValueFrom(this.userService.requestUser());

    const resultSession = await this.authService.validateSession(userResponse);

    if (resultSession.status == true && resultSession.newSession == true)  {
      this.initializeUserSession();
    }
    
    console.log(resultSession, "initial session 1");
    if (resultSession.status == true && userResponse.data.content) {
      console.log(resultSession, userResponse, "initial session  2");
      this.userService.setUserData(userResponse.data.content);
      return {userResponse};
    }

    return {status: false};
  }

  async registerUserSession(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.postUsers(username, password).subscribe({
        next: (value) => {
          console.log(value, "TESTE LOGIN")
          if(value.status == true){
            this.authService.setIsLogged(true);
            console.log(value.data.content, "VALUE CONTENT");
            this.userService.setUserData(value.data.content)
          }else{ 
            this.authService.setIsLogged(false);
          }
          resolve(value);
        },
        error: (err: any) => {
          this.authService.setIsLogged(false);
          reject(err);
        }
      });
    });
  }
}
