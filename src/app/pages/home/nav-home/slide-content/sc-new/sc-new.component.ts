import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CitiesService } from '../../../../../shared/services/cities.service';
import { AuthService } from '../../../../../shared/services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-sc-new',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sc-new.component.html',
  styleUrls: ['./sc-new.component.css']
})
export class ScNewComponent implements AfterViewChecked {
  @ViewChild('newInput') searchInput!: ElementRef;
  inputNewCity: string = "";

  constructor(private citiesService: CitiesService, private authService: AuthService) {}

  async onSubmit() {
    if (!this.inputNewCity.trim()) {
      console.log("City name is empty");
      return;
    }

    const cityArray = [this.inputNewCity.trim()];
    console.log("submit city", cityArray);
    const isLogged = await firstValueFrom(this.authService.getIsLogged())
    if(isLogged){ 
      this.citiesService.requestPostCitiesWeather(cityArray).subscribe({
        next: (response) => {
          console.log(response, "RESULTADO CITIES NEW");
        },
        error: (err) => {
          console.error("Erro ao enviar cidades:", err);
        }
      });
    }else{
      this.citiesService.requestCitiesWeatherPublic(cityArray).subscribe({next: (response) => {console.log(response, "RESULTADO CITIES NEW UNLOGGED");}})
    }
    this.inputNewCity = ""; 
  }

  ngAfterViewChecked(): void {
    if (this.searchInput?.nativeElement) {
      this.searchInput.nativeElement.focus();
    }
  }
}
