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
  ){}

  ngOnInit(): void {  
    console.log("TESTESTSETSETSET");

    // this.userService.postUsers("carlos", "carlos").subscribe({
    //   next: (value: any) => {console.log(value)}
    // });
    
    this.userService.getUser().subscribe({
      next: (value) => {
        console.log(value , "asdfasd");
      }
    })
  }

  

}
