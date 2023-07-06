import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  displayParagraph = false;
  clicks = [];

  onDisplayButtonClick() {
    this.displayParagraph = !this.displayParagraph;
    this.clicks.push(new Date());
  }
}
