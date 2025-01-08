import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SiteTitleComponent } from '../../../../../shared/site-title/site-title.component';
import { SlideAuthLgComponent } from '../slide-auth-lg/slide-auth-lg.component';
import { ActiveContentAuthNavService } from '../../active-content-auth-nav.service';
@Component({
  selector: 'app-sidenav-auth-lg',
  standalone: true,
  imports: [SlideAuthLgComponent, RouterLink, CommonModule, SiteTitleComponent],
  templateUrl: './sidenav-auth-lg.component.html',
  styleUrl: './sidenav-auth-lg.component.css'
})
export class SidenavAuthLgComponent implements OnInit{
  activeContent: string | null = null;

  constructor(private activeContentS$: ActiveContentAuthNavService){}

  ngOnInit(): void {
    this.activeContentS$.getActiveContent().subscribe((content) =>{
      this.activeContent = content;
    })
  }

  toggleContent(newContent: string){
    console.log(newContent);
    this.activeContentS$.setActiveContent(this.activeContent === newContent ? null : newContent);
  }
}
