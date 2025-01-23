import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../../shared/services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeleteCitiesWModeService } from '../../../delete-cities-w-mode.service';
import { AuthService } from '../../../../../shared/services/auth.service';
import { firstValueFrom } from 'rxjs';



@Component({
  selector: 'app-sc-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sc-settings.component.html',
  styleUrl: './sc-settings.component.css'
})
export class ScSettingsComponent implements OnInit{
  isDeleteCitiesWModeOn$ = false;
  citiesToDelete: string[] = [];
  constructor(private authService: AuthService, private deleteCitiesWService: DeleteCitiesWModeService){}

  ngOnInit(): void {
    this.deleteCitiesWService.getIsDeleteCitiesW().subscribe({
      next: (value) => {
        this.isDeleteCitiesWModeOn$ = value;
      }
    })
  }

  async submitDeleteCities(){
    const isLogged = await firstValueFrom (this.authService.getIsLogged());
    this.citiesToDelete = this.deleteCitiesWService.getCitiesToDelete();
    if(this.citiesToDelete.length > 0){
      if(!isLogged){
        console.log(this.citiesToDelete);
        this.deleteCitiesWService.removeSessionCities(this.citiesToDelete);
      }else{
        
      }
     
    }
  }

  toggleDeleteMode(){
    this.deleteCitiesWService.setIsDeleteCitiesW(!this.isDeleteCitiesWModeOn$);
  }
}