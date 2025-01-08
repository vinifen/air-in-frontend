import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ActiveContentAuthNavService } from '../nav-auth/active-content-auth-nav.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-auth',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './main-auth.component.html',
  styleUrl: './main-auth.component.css'
})
export class MainAuthComponent implements OnInit {
  activeContent: string | null = null;

  constructor(private activeContentS$: ActiveContentAuthNavService){}

  ngOnInit(): void {
    this.activeContentS$.getActiveContent().subscribe((content) =>{
      this.activeContent = content;
    })
  }
}
