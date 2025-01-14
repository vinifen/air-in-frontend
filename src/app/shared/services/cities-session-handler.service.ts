import { Injectable } from '@angular/core';
import { CitiesService } from './cities.service';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';
import ICitiesData from '../interfaces/ICitiesData';

@Injectable({
  providedIn: 'root'
})
export class CitiesSessionHandlerService {

  constructor(private authService: AuthService, private citiesService: CitiesService) {}

  checkCities(){
    this.authService.getIsLogged().subscribe({
      next: async (islogged) => {
        if(islogged){
          const data: ICitiesData[] = await firstValueFrom(this.citiesService.requestCitiesWeather());
          this.citiesService.setCitiesData(data);
        }
      }
    })
  }
}
