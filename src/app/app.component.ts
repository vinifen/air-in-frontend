import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersService } from './shared/services/users.service';
import { RequestSessionTokenService } from './shared/services/request-session-token.service';
import { AuthService } from './shared/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { UserSessionHandlerService } from './shared/services/user-session-handler.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'air-in';
  private result: any;

  constructor(
    private handleUserSession: UserSessionHandlerService,
    private userService: UsersService,
    private authService: AuthService
  ){}

  ngOnInit() {
    console.log("TESTESTSETSETSET");

    // this.userService.postUsers("caddrsssgfflossss", "carlos").subscribe({
    //   next: (value: any) => {console.log(value)}
    // });

    // this.userService.requestUser().subscribe({

    //   next: (data: {status: boolean, data: any}) => {
    //     this.authService.validateSession(data);
    //     console.log(data, "DATA");
    //     this.isLogged.getIsLogged().subscribe({

    //       next: async (value) => {
    //         if (value === true && data.data.content) {
    //           this.userService.setUserData(data.data.content);
    //         } this.userService.getUserData().subscribe({next: (value) =>{console.log(value, "asdfa userdata")}})
    //       }
    //     });
    //   },
    //   error: (err) => {
    //     console.error("Error fetching user data:", err);
    //   }
    // });
    //this.handleUserSession.postUserSession("cssarddlos", "varsco");
    this.handleUserSession.initializeUserSession();
    console.log(this.userService.getUserData().subscribe({next: (value) => {console.log(value, "USER VALUE")}}))
    console.log(this.authService.getIsLogged().subscribe({next: (value) => {console.log(value, "ISLOGGED VALUE")}}))
  }

  

}
