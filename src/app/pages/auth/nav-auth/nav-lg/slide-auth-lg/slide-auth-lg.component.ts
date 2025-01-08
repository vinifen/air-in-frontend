import { Component, OnInit } from '@angular/core';
import { ActiveContentAuthNavService } from '../../active-content-auth-nav.service';
import { ScaTestAccountComponent } from '../../slide-content-auth/sca-test-account/sca-test-account.component';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-slide-auth-lg',
  standalone: true,
  imports: [ScaTestAccountComponent, NgComponentOutlet],
  templateUrl: './slide-auth-lg.component.html',
  styleUrl: './slide-auth-lg.component.css'
})
export class SlideAuthLgComponent implements OnInit{
  activeSlide: string | null = null;
  constructor(private activeContentS$: ActiveContentAuthNavService){}

  ngOnInit(): void {
    this.activeContentS$.getActiveContent().subscribe((content) =>{
      this.activeSlide = content;
    })
  }

  getComponent(){
    switch(this.activeSlide){
      case 'test-account':
        return ScaTestAccountComponent;
      default:
        return null;
    }
  }
}
