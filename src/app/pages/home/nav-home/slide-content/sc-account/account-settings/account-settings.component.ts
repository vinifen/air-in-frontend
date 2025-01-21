import { Component, EventEmitter, Output } from '@angular/core';
import { AccountDeleteUserComponent } from './content-account-settings/account-delete-user/account-delete-user.component';
import { AccountEditUsnmComponent } from './content-account-settings/account-edit-usnm/account-edit-usnm.component';
import { AccountEditPwComponent } from './content-account-settings/account-edit-pw/account-edit-pw.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [CommonModule, AccountEditUsnmComponent, AccountEditPwComponent, AccountDeleteUserComponent],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent {
  accountSettingsContent = "settings";

  @Output() accountSettingsToggled = new EventEmitter<boolean>();

  toggleAccountSettingsContent(value: string){
    this.accountSettingsContent = value;
  }
  
  toggleReturnMain(){
    this.accountSettingsToggled.emit(false);
  }
}
