import { Component, input } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { UserSessionHandlerService } from '../../../../shared/services/user-session-handler.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMessage: string | null = null;
  successMessage: string | null = null; 
  isFormValid: boolean = false;

  inputUsername: string = "";
  inputPassword: string = "";
  inputPasswordConfirm: string = "";

  constructor(
    private handleUserSession: UserSessionHandlerService,
    private router: Router
  ) {}

  validateForm(): void {
    this.isFormValid = !!this.inputUsername && !!this.inputPassword && !!this.inputPasswordConfirm && this.inputPassword === this.inputPasswordConfirm;
    
    this.errorMessage = !this.isFormValid && this.inputPassword !== this.inputPasswordConfirm ? 'Passwords do not match.' : '';

    console.log(this.isFormValid);
  }
  async onSubmit() {
  
    if (!this.inputUsername || !this.inputPassword || !this.inputPasswordConfirm) {
      this.errorMessage = 'All fields are required.';
      this.successMessage = null;
      return false;
    }
  
    if (this.inputPassword !== this.inputPasswordConfirm) {
      this.errorMessage = 'Passwords do not match.';
      this.successMessage = null;
      return false;
    }
  
    this.errorMessage = null;
  
    try {
      const data = await this.handleUserSession.registerUserSession(this.inputUsername, this.inputPassword);
      if (data?.data?.message) {
        this.successMessage = data.data.message; 
        setTimeout(() => {
          this.router.navigate(['']);
        }, 2000);
      }
    } catch (err) {
      this.errorMessage = 'Registration failed. Please try again.';
      this.successMessage = null;
    }
  
    return false;
  }
}
