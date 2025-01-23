import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { CitiesWeatherService } from '../../shared/services/cities-weather.service';
import ICitiesData from '../../shared/interfaces/ICitiesData';

@Injectable({
  providedIn: 'root'
})
export class DeleteCitiesWModeService {
  private weatherData: ICitiesData[] | null = null;
  private citiesToDelete: string[] = [];
  private isDeleteCitiesWModeOn = new BehaviorSubject<boolean>(false);
  constructor(private citiesWService: CitiesWeatherService) {}

 

  setCitiesToDelete(cities: string []){
    this.citiesToDelete = cities;
    console.log(this.citiesToDelete);
  }

  async removeSessionCities(citiesRemoved: string[]) {
    this.weatherData = await firstValueFrom(this.citiesWService.getCitiesData());
    if (this.weatherData) { 
      const newWeatherData = this.weatherData.filter((cityWeather: ICitiesData) => 
        !citiesRemoved.includes(cityWeather.city)
      );
      console.log(newWeatherData, "NEW WEATHER DATA");
      this.citiesWService.setCitiesData(newWeatherData);
    }
  }

  getCitiesToDelete(){
    return this.citiesToDelete;
  }

  setIsDeleteCitiesW(value: boolean){
    this.isDeleteCitiesWModeOn.next(value);
  }

  getIsDeleteCitiesW(){
    
    return this.isDeleteCitiesWModeOn.asObservable();
  }

}
