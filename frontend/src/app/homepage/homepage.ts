import { Component } from "@angular/core";
import { HomeCarousel } from "./home-carousel/home-carousel";

@Component({
  selector: "app-homepage",
  imports: [HomeCarousel],
  templateUrl: "./homepage.html",
})
export class Homepage {}
