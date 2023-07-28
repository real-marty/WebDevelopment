import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  collapsed = true;
  recipesPageShown: string = 'recipes';
  @Output() pageShown = new EventEmitter<string>();

  onChangePage(pageShownString: string) {
    this.recipesPageShown = pageShownString;
    this.pageShown.emit(this.recipesPageShown);
  }
}
