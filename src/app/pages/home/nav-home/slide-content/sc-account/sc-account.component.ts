import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../../../shared/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../../shared/services/users.service';
import IUserData from '../../../../../shared/interfaces/IUserData';
import { ActiveSlideNavService } from '../../active-slide-nav.service';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AccountMainComponent } from './account-main/account-main.component';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-sc-account',
  standalone: true,
  imports: [CommonModule, AccountSettingsComponent, AccountMainComponent],
  templateUrl: './sc-account.component.html',
  styleUrl: './sc-account.component.css'
})
export class ScAccountComponent implements OnInit{
  isAccountSettingsActive: boolean = false;
  isLgScreen: boolean = false

  constructor(private breakpointObserver: BreakpointObserver){}

  ngOnInit(): void {
    this.breakpointObserver.observe(['(min-width: 1024px)']).subscribe((result) => {
      this.isLgScreen = result.matches;
    });
  }

  
  toggleAccountSettings(event: boolean){
    this.isAccountSettingsActive = event;
  }


}
