import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import ICitiesData from '../interfaces/ICitiesData';
import { AuthService } from './auth.service';
import { CitiesWeatherService } from './cities-weather.service';
import { U } from '@angular/cdk/keycodes';
import { UserSessionHandlerService } from './user-session-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CitiesWSessionHandlerService {
  constructor(
    private authService: AuthService, 
    private citiesWeatherService: CitiesWeatherService, 
    private userSessionHandlerS: UserSessionHandlerService
  ) {}

  checkCities(){
    this.authService.getIsLogged().subscribe({
      next: async (islogged) => {
        if(islogged){
          const data: ICitiesData[] = await firstValueFrom(this.citiesWeatherService.requestCitiesWeather());
          this.citiesWeatherService.setCitiesData(data);
        }
      }
    })
  }


  postCitiesWeather(cities: string[]) {
    this.citiesWeatherService.requestPostCitiesWeather(cities).subscribe({
      next: async (newCities: any) => {
        try {

          // if(!newCities.status && newCities.data.stStatus === false){
          //   console.log("rodou ERROR cITIES");
          //   const resultError = await this.userSessionHandlerS.handlerErrorRequest(newCities);
          //   if(resultError.status == false && resultError.newSession === false){
          //     this.citiesWeatherService.setCitiesData(null);
          //     console.error("Unlogged");
          //     return 
          //   }
          //   if(resultError.status === true && resultError.newSession === true){
          //     return this.postCitiesWeather(cities);
          //   }
          // }

          console.log(newCities, "NOVAS CIDADES POSTADAS");
  
          const filteredNewCities = await this.removeInvalidCitiesW(newCities.data);
  
          if (filteredNewCities.status && filteredNewCities.data) {
            const updatedData = await this.updatedCitiesWeatherData(filteredNewCities.data);
          
            if (updatedData) {
              this.citiesWeatherService.setCitiesData(updatedData);
            }
          }
        } catch (error) {
          console.error("Error processing the cities:", error);
        }
      },
      error: (err) => {
        console.error("Error in the request to postCitiesWeather:", err);
      }
    });
  }


  postCitiesWeatherPublic(cities: string[]) {
    console.log("DESLOGADO CITIES");
    this.citiesWeatherService.requestCitiesWeatherPublic(cities).subscribe({
      next: async (newCities: any) => {
        try {
          console.log(newCities, "NOVAS CIDADES")
          const filteredNewCities = await this.removeInvalidCitiesW(newCities.data);

          if(filteredNewCities.status && filteredNewCities.data){
            const updatedData = await this.updatedCitiesWeatherData(filteredNewCities.data);
          
            if(updatedData){ 
              this.citiesWeatherService.setCitiesData(updatedData);
            }
          }
        } catch (error) {
          console.error("Erro ao atualizar os dados:", error);
        }
      }
    })
  }


  private async removeInvalidCitiesW(cities: ICitiesData[] ){
    console.log(cities, "remove invalid cities CITY");
    const filteredCities = cities.filter(cities => !!cities.status);

    if(filteredCities.length == 0){
      if(cities.length === 1){
        return { status: false, message:  "This city has already with error", data: filteredCities}
      }   
      return { status: false, message: "All cities have now with error", data: filteredCities}
    }

    if(filteredCities.length < cities.length){
      return { status: true, message: "One or more cities have already with error.", data: filteredCities}
    }
    if(cities.length === 1){   
      return {status: true, data: filteredCities, message: "City successfully."};
    }
    return {status: true, data: filteredCities, message: "All cities successfully."};
  }
  

  private async updatedCitiesWeatherData(newCities: ICitiesData[]){
    if(!newCities){
      return null;
    }
    const existingData: ICitiesData[] | null = await firstValueFrom(this.citiesWeatherService.getCitiesData());
  
    let updatedData: ICitiesData[];
    if (existingData) {
      updatedData = [...existingData, ...newCities];
    } else {
      updatedData = [...newCities];
    }
    return updatedData;
  }
  
}
