import { Component } from '@angular/core';
import { AuthService } from '../../../../../shared/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sc-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sc-account.component.html',
  styleUrl: './sc-account.component.css'
})
export class ScAccountComponent {
  constructor(private authService: AuthService){}

  async toggleLogout(){
    
    const isLogged = await firstValueFrom(this.authService.getIsLogged());
    console.log(isLogged);
    if(isLogged){
      const result = await firstValueFrom(this.authService.requestLogout());
      console.log(result, "RESULTADO LOGOUT");
      window.location.reload();
      this.authService.setIsLogged(false);
    }
  }
}
