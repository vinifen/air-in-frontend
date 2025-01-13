import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { switchMap, take } from 'rxjs/operators';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import ICitiesData from '../interfaces/ICitiesData';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private citiesData$: BehaviorSubject<ICitiesData | null> = new BehaviorSubject<ICitiesData | null>(null);
  private apiURL: string = environment.backendURL;
 

  constructor(private http: HttpClient, private userService: UsersService) {}

  setCitiesData(newCitiesData: ICitiesData | null){
    console.log(newCitiesData, "NEW CITIES DATA");
    if(!newCitiesData){
      this.citiesData$.next(null);
    }else{ 
      this.citiesData$.next({ city: newCitiesData.city, content: newCitiesData.content, status: newCitiesData.status });
    }
  }
  
  getCitiesData(): Observable<ICitiesData | null>{
    return this.citiesData$.asObservable();
  }

  requestCities() {
    return this.http.get(`${this.apiURL}cities`, {withCredentials: true}).pipe(take(1));
  }

  requestPostCities(cityNames: string[]) {
    return this.userService.getUserData().pipe(
      take(1),
      switchMap(userData => {
        if (!userData) {
          return EMPTY;
        }
        const body = { userID: userData.userID, cities: cityNames };
        return this.http.post(`${this.apiURL}cities`, body, {withCredentials: true}).pipe(take(1));
      })
    );
  }

  requestCitiesWeatherData() {
    return this.http.get(`${this.apiURL}cities/weather`, {withCredentials: true}).pipe(take(1));
  }

  requestCitiesWeatherDataUnlogged(cityNames: string[]) {
    return this.http.post(`${this.apiURL}cities/weather/unlogged`, cityNames).pipe(take(1));
  }

  //talvez eu nao use
  requestCitiesWeatherDataByCityId(cityId: number) {
    return this.http.get(`${this.apiURL}cities/${cityId}/weather`, {withCredentials: true}).pipe(take(1));
  }
}
