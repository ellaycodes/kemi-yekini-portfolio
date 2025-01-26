import { Component } from '@angular/core';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './html/nav.components.html',
  styleUrl: '../../css-dist/nav.component.min.css',
})
export class NavBar {
  
  handleClick(event: MouseEvent): void {
    console.log(event);
  }
}