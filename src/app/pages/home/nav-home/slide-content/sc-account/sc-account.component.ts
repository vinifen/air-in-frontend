import { Component, input, OnInit } from '@angular/core';
import { AuthService } from '../../../../../shared/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../../shared/services/users.service';
import IUserData from '../../../../../shared/interfaces/IUserData';
import { ActiveSlideNavService } from '../../active-slide-nav.service';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AccountMainComponent } from './account-main/account-main.component';

@Component({
  selector: 'app-sc-account',
  standalone: true,
  imports: [CommonModule, AccountSettingsComponent, AccountMainComponent],
  templateUrl: './sc-account.component.html',
  styleUrl: './sc-account.component.css'
})
export class ScAccountComponent {
  isAccountSettingsActive: boolean = false;
  
  toggleAccountSettings(event: boolean){
    this.isAccountSettingsActive = event;
  }

}
