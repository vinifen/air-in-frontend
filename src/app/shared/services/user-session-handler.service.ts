import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UserSessionHandlerService {
  isInitialized$ = new BehaviorSubject<boolean>(false);
  constructor(private authService: AuthService, private userService: UsersService) {}

  async checkUserSession() {
    try {
      const userResponse: { status: boolean, data: any } = await firstValueFrom(this.userService.requestUser());
      const userResponseData = userResponse.data;
      console.log(userResponse, "USER RESPONSE");
  
      if (userResponse.status && userResponseData.stStatus && userResponseData.content.publicUserID) {
        console.log("LOGADO");
        this.authService.setIsLogged(true);
        this.userService.setUserData(userResponseData.content);
        return userResponseData;
      }
      this.authService.setIsLogged(false);
      return userResponseData;
    } catch (error) {
      console.error('Error checking user session:', error);
      throw error;
    }
  }


  async handlerErrorRequest(userResponse: {status: boolean, data: any} ){
    console.log("RODOU HANDLER ERROR REQUEST")
    const resultSession: {status: boolean, newSession: boolean} = await this.authService.validateSession(userResponse);

    if (resultSession.status == true && resultSession.newSession == true)  {
      console.log("CERTO DENTRO HANDLER ERROR", resultSession);
      return {status: true, newSession: true}
    }
    
    console.log(resultSession, "initial session 1");
    if (resultSession.status == false || !userResponse.data.content) {
      this.authService.setIsLogged(false);
      this.userService.setUserData(null);
      console.log(this.userService.getUserData().subscribe({next: (v) => console.log(v, "É PRA SER NULL CHECKUSER")}));
      return {status: false, message: "Invalid Session", newSession: false};
    }
    console.log(resultSession, userResponse, "initial session  2");
    this.userService.setUserData(userResponse.data.content);
    return {status: userResponse.status, data: userResponse.data, newSession: false};
  }


  async registerUserSession(username: string, password: string) {
    return new Promise<{status: boolean, message: string}>((resolve, reject) => {
      this.userService.requestPostUsers(username, password).subscribe({
        next: (value) => {
          console.log(value, "TESTE LOGIN")
          if(value.status == true){
            this.authService.setIsLogged(true);
            console.log(value.data, "VALUE CONTENT");
            this.userService.setUserData(value.data.content);
            resolve({status: true, message: value.data.message});
          }else{ 
            this.authService.setIsLogged(false);
            this.userService.setUserData(null);
            console.log(this.userService.getUserData().subscribe({next: (v) => console.log(v, "É PRA SER NULL REGISTER")}))
            resolve({status: false, message: value.data.message});
          }
        },
        error: (err: any) => {
          console.log(err, "ERRO DE REGISTRO");
          const errorMessage = err?.error?.data?.message || "An error occurred"; 
          this.authService.setIsLogged(false);
          this.userService.setUserData(null);
          reject({ status: false, message: errorMessage });
        }
      });
    });
  }

  async loginUserSesion(username: string, password: string) {
    return new Promise<{status: boolean, message: string}>((resolve, reject) => {
      this.authService.requestLogin(username, password).subscribe({
        next: (value) => {
          if(value.status == true){
            this.authService.setIsLogged(true);
            console.log(value, "VALUE LOGIN ");
            this.userService.setUserData(value.data.content);
            resolve({status: true, message: value.data.message});
          }else{
            this.authService.setIsLogged(false);
            this.userService.setUserData(null);
            console.log(this.userService.getUserData().subscribe({next: (v) => console.log(v, "É PRA SER NULL LOGIN")}));
            resolve({status: false, message: value.data.message});
          }
        },
        error: (err: any) => {
          this.authService.setIsLogged(false);
          this.userService.setUserData(null);
          console.log(err, "ERRO LOGIN ERROR")
          console.log(err.error.data.message, "ERRO LOGIN ERROR")
          reject({status: false, message: err.error.data.message});
        }
      })
    });
    
  }


}
