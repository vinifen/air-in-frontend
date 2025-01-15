import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersService } from './shared/services/users.service';
import { AuthService } from './shared/services/auth.service';
import { UserSessionHandlerService } from './shared/services/user-session-handler.service';
import { CitiesWeatherService } from './shared/services/cities-weather.service';
import { CitiesWSessionHandlerService } from './shared/services/cities-w-session-handler.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'air-in';

  constructor(
    private handleUserSession: UserSessionHandlerService,
    private userService: UsersService,
    private authService: AuthService,
    private handlerCitiesWeatherSession: CitiesWSessionHandlerService,
    private citiesWeatherService: CitiesWeatherService
  ){}

  ngOnInit() {
    
  
    
    this.handleUserSession.checkUserSession();
    const data = this.handlerCitiesWeatherSession.checkCities();
    this.citiesWeatherService.getCitiesData().subscribe({
      next: (value) => { console.log(value, "CITIES VALUE") }
    });
    console.log(data, "CHECK HANDLER APP.ts");
    this.userService.getUserData().subscribe({ next: (value) => { console.log(value, "USER VALUE") } });
    this.authService.getIsLogged().subscribe({ next: (value) => { console.log(value, "ISLOGGED VALUE") } });


    // const citiesTest = ["Guarapuava", "New York", "Paris", "Franca", "Londres", "Curitiba", "Mato Grosso"];
    // console.log(citiesTest);
    // this.citiesWeatherService.requestPostCitiesWeather(citiesTest).subscribe({
    //   next: (value) => {
    //     console.log(value, "REQUEST USER CITIES WEATHER TESTE APP.ts");
    //   },
    //   error: (err) => {
    //     console.error('Error in request:', err);
    //   }
    // });
  }

}
