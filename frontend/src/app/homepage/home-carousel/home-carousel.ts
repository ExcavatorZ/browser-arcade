import { Component, computed, OnDestroy, OnInit, signal } from "@angular/core";

@Component({
  selector: "app-home-carousel",
  imports: [],
  templateUrl: "./home-carousel.html",
})
export class HomeCarousel implements OnInit, OnDestroy {
  imageIndex = signal(0);
  private intervalId!: number;

  currentImage = computed(() => this.images[this.imageIndex()]);

  images = [{ title: "Learn!" }, { title: "Have fun!" }, { title: "Compete!" }];

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      if (this.imageIndex() == this.images.length - 1) {
        this.imageIndex.set(0);
      } else {
        this.imageIndex.set(this.imageIndex() + 1);
      }
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
