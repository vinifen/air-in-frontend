import { Component, OnInit } from '@angular/core';
import { ApiWeatherService } from '../../../shared/services/api-weather.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import { UsersService } from '../../../shared/services/users.service';
import { CitiesWSessionHandlerService } from '../../../shared/services/cities-w-session-handler.service';
import { firstValueFrom } from 'rxjs';
import { CitiesWeatherService } from '../../../shared/services/cities-weather.service';

@Component({
  selector: 'app-main-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css'] 
})
export class MainHomeComponent implements OnInit {
  islogged$: boolean = false;
  weatherData$: any;
  userdata: any;

  constructor(
    private authService: AuthService, 
    private userService: UsersService, 
    private citiesWHandler: CitiesWSessionHandlerService, 
    private citiesWeatherService: CitiesWeatherService
  ) {}

  async ngOnInit(){
    this.authService.getIsLogged().subscribe({
      next: (value: boolean) => {
        this.islogged$ = value;
      }
    });

    this.citiesWHandler.checkCities();

    this.citiesWeatherService.getCitiesData().subscribe({
      next: (value) => {
        this.weatherData$ = value;
        console.log(this.weatherData$, "WEATHER DATA MAIN-HOME");
      }
    })
  }
}
