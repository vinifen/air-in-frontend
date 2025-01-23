import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import { CitiesWSessionHandlerService } from '../../../shared/services/cities-w-session-handler.service';
import { firstValueFrom } from 'rxjs';
import { CitiesWeatherService } from '../../../shared/services/cities-weather.service';
import { ActiveSlideNavService } from '../nav-home/active-slide-nav.service';
import { DeleteCitiesWModeService } from '../delete-cities-w-mode.service';
import ICitiesData from '../../../shared/interfaces/ICitiesData';


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
  activeSlide$: string | null = null;
  isDeleteCitiesWModeOn$: boolean = false;
  citiesToDelete: string[] = [];

  constructor(
    private authService: AuthService, 
    private activeSlideService: ActiveSlideNavService,
    private citiesWHandler: CitiesWSessionHandlerService, 
    private citiesWeatherService: CitiesWeatherService,
    private deleteCitiesWService: DeleteCitiesWModeService,
  ) {}

  async ngOnInit(){
    this.activeSlideService.getActiveSlide().subscribe({
      next: (value)=>{
        this.activeSlide$ = value;
        console.log(this.activeSlide$, "ACTIVESLIDE$ VALUE em main-home")
      } 
    });

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
    });

    this.deleteCitiesWService.getIsDeleteCitiesW().subscribe({
      next: (value) => {
        this.isDeleteCitiesWModeOn$ = value;
      }
    })
  }

  selectCitiesToDelete(cityName: string) {
    if (!this.citiesToDelete.includes(cityName)) {
      this.citiesToDelete.push(cityName);
      this.deleteCitiesWService.setCitiesToDelete(this.citiesToDelete);
    }
  }

  changeActiveSlideToNew(){
    this.activeSlideService.setActiveSlide(this.activeSlide$ === "new" ? null : "new");
  }
}
