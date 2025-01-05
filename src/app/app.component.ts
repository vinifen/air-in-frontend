import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersService } from './shared/services/users.service';
import { RequestSessionTokenService } from './shared/services/request-session-token.service';
import { IsLoggedService } from './shared/services/is-logged.service';
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
    private userService: UsersService, 
    private requestNewSessionToken: RequestSessionTokenService,
    private isLogged: IsLoggedService
  ){}
   
  //transferir essa logica para .guard

  ngOnInit(): void {  
    console.log("asdfasdfasdfasdfasd");
    this.userService.postUsers("adaassdffdfsdf", 'asdf').subscribe({
      next: (response) =>{
        console.log(response.data + "asdfase4afdsfasd");
      },
      error: (error) => {
        console.log(error.error.data.message)
      }
    });

    this.userService.getUsers().subscribe({
      next: (response) => {
        console.log(response.data);
        this.result = response.data;

        if(this.result.hasToken == true && this.result.sessionTokenStatus == true){
          this.requestNewSessionToken.requestSessionToken().subscribe({
            next: (response) => {
              console.log(response.data);
              if(response.data.status == false){
                return this.isLogged.setIsLogged(false);
              }
              return this.isLogged.setIsLogged(true);
            }
          })
        }
      },
      error: (err) => {
        console.error("Error on get api", err);
      }
    });
   

    
  }

  

}
