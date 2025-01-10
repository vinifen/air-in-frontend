import { Component, OnInit } from '@angular/core';
import { SiteTitleComponent } from '../../../../../shared/components/site-title/site-title.component';
import { ActiveSlideNavService } from '../../active-slide-nav.service';
import { CommonModule } from '@angular/common';
import { ScSearchBarComponent } from '../../slide-content/sc-search-bar/sc-search-bar.component';
import { ScAccountComponent } from '../../slide-content/sc-account/sc-account.component';
import { ScNewComponent } from '../../slide-content/sc-new/sc-new.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
  selector: 'app-nav-top-home-sm',
  standalone: true,
  imports: [RouterLink, SiteTitleComponent, CommonModule, ScSearchBarComponent, ScAccountComponent, ScNewComponent],
  templateUrl: './nav-top-home-sm.component.html',
  styleUrl: './nav-top-home-sm.component.css'
})
export class NavTopHomeSmComponent implements OnInit {
  activeSlide: string | null = null;

  constructor(
    private activeSlideService$: ActiveSlideNavService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activeSlideService$.getActiveSlide().subscribe((content) => {
      this.activeSlide = content;
    });
  }

  toggleSlide(newContent: string): void {
    this.authService.getIsLogged().subscribe({next: (value: boolean) => {
      console.log(value);
      if(value == false && newContent === "account"){
        return
      }
      this.activeSlideService$.setActiveSlide(this.activeSlide === newContent ? null : newContent);
    }});
  }
}