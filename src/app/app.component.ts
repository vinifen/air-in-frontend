import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersService } from './shared/services/users.service';
import { AuthService } from './shared/services/auth.service';
import { CitiesWeatherService } from './shared/services/cities-weather.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InitializeService } from './shared/services/initialize.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'air-in';

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private citiesWeatherService: CitiesWeatherService,
    private initializeService: InitializeService
  ){}

  async ngOnInit() {
    
    await this.initializeService.startApp();
    this.initializeService.getIsInitialized().subscribe({next: (value) => {console.log("IS INITIZATED", value)}})
    console.log("RODOU APP.ts ")
    
    this.citiesWeatherService.getCitiesData().subscribe({
      next: (value) => { console.log(value, "CITIES VALUE") }
    });
  
    this.userService.getUserData().subscribe({ next: (value) => { console.log(value, "USER VALUE") } });
    this.authService.getIsLogged().subscribe({ next: (value) => { console.log(value, "ISLOGGED VALUE") } });
  }

}
