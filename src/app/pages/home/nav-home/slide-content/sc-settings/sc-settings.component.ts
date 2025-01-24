import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeleteCitiesWModeService } from '../../../delete-cities-w-mode.service';
import { AuthService } from '../../../../../shared/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { CitiesWeatherService } from '../../../../../shared/services/cities-weather.service';


@Component({
  selector: 'app-sc-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sc-settings.component.html',
  styleUrl: './sc-settings.component.css'
})
export class ScSettingsComponent implements OnInit, OnDestroy{
  isDeleteCitiesWModeOn$ = false;
  constructor(private authService: AuthService, private deleteCitiesWService: DeleteCitiesWModeService, private citiesWService: CitiesWeatherService){}

  ngOnInit(): void {
    this.deleteCitiesWService.getIsDeleteCitiesW().subscribe({
      next: (value) => {
        this.isDeleteCitiesWModeOn$ = value;
      }
    })
  }

  async submitDeleteCities(){
    const isLogged = await firstValueFrom (this.authService.getIsLogged());
    const citiesToDelete = await firstValueFrom (this.deleteCitiesWService.getCitiesToDelete());
    console.log(citiesToDelete, "CITIES TO DELETE SUBMIT")
    if(citiesToDelete.length > 0){
      if(isLogged){
        console.log(citiesToDelete, "aa");
        const resultDeleteCities = await firstValueFrom(this.citiesWService.deleteCities(citiesToDelete));
        if(resultDeleteCities.status){
          this.deleteCitiesWService.removeSessionCities(citiesToDelete);
        }else{
          console.error(resultDeleteCities.data.message);
        } 
      }else{
        this.deleteCitiesWService.removeSessionCities(citiesToDelete);
      }
     
    }
    this.deleteCitiesWService.setCitiesToDelete([]);
  }

  toggleDeleteMode(){
    this.deleteCitiesWService.setCitiesToDelete([]);
    this.deleteCitiesWService.setIsDeleteCitiesW(!this.isDeleteCitiesWModeOn$);
  }

  ngOnDestroy(): void {
    console.log("destruiu")
    // Chama toggleReturnSettings quando o componente for destruído
    this.toggleDeleteMode();
  }
}