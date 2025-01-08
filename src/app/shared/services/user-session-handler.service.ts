import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UserSessionHandlerService {
  constructor(private authService: AuthService, private userService: UsersService) {}

  async initializeUserSession(): Promise<boolean> {
    const userResponse = await firstValueFrom(this.userService.requestUser());

    const resultSession = await this.authService.validateSession(userResponse);

    if (resultSession.status == true && resultSession.newSession == true)  {
      this.initializeUserSession();
    }
    
    console.log(resultSession, "1");
    if (resultSession.status == true && userResponse.data.content) {
      console.log(resultSession, userResponse, "2");
      this.userService.setUserData(userResponse.data.content);
      return true;
    }

    return false;
  }

  async postUserSession(username: string, password: string){
    this.userService.postUsers(username, password).subscribe({
      next: (value) => {
        if(value.status == false){
          this.authService.setIsLogged(false);
        }
        this.authService.setIsLogged(true);
      },
      error: (err: any) => {
        this.authService.setIsLogged(err.error.status);
      }
    })
  }
}
