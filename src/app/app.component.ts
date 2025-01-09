import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersService } from './shared/services/users.service';
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
    this.handleUserSession.initializeUserSession();
    console.log(this.userService.getUserData().subscribe({next: (value) => {console.log(value, "USER VALUE")}}))
    console.log(this.authService.getIsLogged().subscribe({next: (value) => {console.log(value, "ISLOGGED VALUE")}}))
  }

  

}
