import { Component } from '@angular/core';
import { SidenavLgComponent } from '../nav/sidenav-lg/sidenav-lg.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidenavLgComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
