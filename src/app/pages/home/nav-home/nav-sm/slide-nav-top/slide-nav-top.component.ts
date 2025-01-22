import { Component, Input } from '@angular/core';
import { ScAccountComponent } from '../../slide-content/sc-account/sc-account.component';
import { NgComponentOutlet } from '@angular/common';


@Component({
  selector: 'app-slide-nav-top',
  standalone: true,
  imports: [ScAccountComponent, NgComponentOutlet],
  templateUrl: './slide-nav-top.component.html',
  styleUrl: './slide-nav-top.component.css'
})
export class SlideNavTopComponent {
 @Input() activeSlide$: string | null = null;
  constructor(){
    console.log(this.activeSlide$);
  }

  getComponent(){
   if(this.activeSlide$ === "account"){
    return ScAccountComponent;
   }
   return null;
  }
}
