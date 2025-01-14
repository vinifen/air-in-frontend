import { Component, OnInit } from '@angular/core';
import { ApiWeatherService } from '../../../shared/services/api-weather.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import { UsersService } from '../../../shared/services/users.service';

@Component({
  selector: 'app-main-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css'] 
})
export class MainHomeComponent implements OnInit {
  islogged: boolean = false;
  weatherData: any;
  userdata: any;

  constructor(private apiWeatherService: ApiWeatherService, private authService: AuthService, private userService: UsersService) {}

  async ngOnInit(){
    this.apiWeatherService.getWeather(['Guarapuava', 'new york']).subscribe({
      next: (response) => {
        console.log(response);
        this.weatherData = response.data[0].content;
      },
      error: (err) => {
        console.error("Error on get api", err);
      }
    });
    this.authService.getIsLogged().subscribe({
      next: (value: boolean) => {
        this.islogged = value;
      }
    });
    this.userService.getUserData().subscribe({
      next: (value) => {
        this.userdata = value;
      }
    });
  }
}
