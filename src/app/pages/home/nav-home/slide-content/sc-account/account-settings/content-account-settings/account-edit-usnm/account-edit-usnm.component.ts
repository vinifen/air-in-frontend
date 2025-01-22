import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../../../../../../shared/services/users.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-account-edit-usnm',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './account-edit-usnm.component.html',
  styleUrl: './account-edit-usnm.component.css'
})
export class AccountEditUsnmComponent {
  inputNewUsername = "";
  inputPassword = "";
  errorMessage = "";
  successMessage = "";
  constructor(private userService: UsersService){}

  @Output() returnSettings = new EventEmitter<string>();

  async onSubmit() {
    this.errorMessage = "";
    this.successMessage = "";

    if (!this.inputNewUsername.trim() || !this.inputPassword.trim()) {
      this.errorMessage = "Username and password cannot be empty.";
      return;
    }

    try {
      const result = await firstValueFrom(
        this.userService.requestEditUsername(this.inputNewUsername, this.inputPassword)
      );

      if (result && result.status) {
        this.successMessage = result.data.message || "Username updated successfully!";
      } else {
        this.errorMessage = result?.data?.message || "Failed to update the username.";
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      this.errorMessage = "An unexpected error occurred. Please try again.";
    } finally {
      this.inputNewUsername = ""; 
      this.inputPassword = ""; 
    }
  }

  toggleReturnSettings(){
    this.returnSettings.emit("settings");
  }
}
