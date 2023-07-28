import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  pageShown: string = 'recipes';
  onNavigationChange(pageShown: string) {
    this.pageShown = pageShown;
  }
  title = 'recipes';
}
