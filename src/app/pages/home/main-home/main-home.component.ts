import { Component, OnInit } from '@angular/core';
import { ApiWeatherService } from '../../../shared/services/api-weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css'] 
})
export class MainHomeComponent implements OnInit {

  weatherData: any;

  constructor(private apiWeatherService: ApiWeatherService) {}

  ngOnInit(){
    this.apiWeatherService.getWeather(['Guarapuava', 'new york']).subscribe({
      next: (response) => {
        console.log(response.data[0].content);
        this.weatherData = response.data[0].content;
      },
      error: (err) => {
        console.error("Error on get api", err);
      }
    });
  }
}
