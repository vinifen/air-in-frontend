import { Component } from '@angular/core';
import { UsersService } from '../../../../../shared/services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sc-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sc-settings.component.html',
  styleUrl: './sc-settings.component.css'
})
export class ScSettingsComponent {
  inputPasswordDelete = "";
  inputPasswordEditUsername = "";
  inputNewUsername = "";
  inputNewPasswordAlterPassword = "";
  inputOldPasswordAlterPassword = "";
  constructor(private userService: UsersService){}

  toggleDelete(){
    console.log(this.inputPasswordDelete);
    this.userService.requestDeleteUser(this.inputPasswordDelete).subscribe({next:(value)=>{console.log(value)}});
  }

  toggleUpdateUsername(){
    console.log(this.inputPasswordDelete);
    this.userService.requestEditUsername(this.inputNewUsername ,this.inputPasswordEditUsername).subscribe({next:(value)=>{console.log(value)}});
  }

  toggleUpdatePassword(){
    console.log(this.inputNewPasswordAlterPassword);
    this.userService.requestEditPassword(this.inputNewPasswordAlterPassword ,this.inputOldPasswordAlterPassword).subscribe({next:(value)=>{console.log(value)}});
  }
}
