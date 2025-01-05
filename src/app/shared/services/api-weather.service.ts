import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiWeatherService {
  apiURL: string = environment.backendURL;
  
  constructor(private http: HttpClient) {}

  getWeather(cities: string[]): Observable<any>{
    const data = this.http.post(`${this.apiURL}cities/weather/unlogged`, cities).pipe(take(1));
    console.log(data);
    return data;
  }
}
