import { Component, computed, OnDestroy, OnInit, signal } from "@angular/core";

@Component({
  selector: "app-home-carousel",
  imports: [],
  templateUrl: "./home-carousel.html",
})
export class HomeCarousel implements OnInit, OnDestroy {
  imageIndex = signal(0);
  filepath = "assets/generic/";
  private intervalId!: number;

  currentImage = computed(() => this.images[this.imageIndex()]);

  images = [
    { title: "Learn!", path: `${this.filepath}carousel_0.png`, id: 0 },
    { title: "Have fun!", path: `${this.filepath}carousel_1.png`, id: 1 },
    { title: "Compete!", path: `${this.filepath}carousel_2.png`, id: 2 },
  ];

  prevImage = () => {
    this.imageIndex.update((index) => (index - 1 + this.images.length) % this.images.length);
    clearInterval(this.intervalId);
    this.startCarousel();
  };

  nextImage = () => {
    this.imageIndex.update((index) => (index + 1) % this.images.length);
    clearInterval(this.intervalId);
    this.startCarousel();
  };

  startCarousel = () => {
    this.intervalId = setInterval(() => {
      if (this.imageIndex() == this.images.length - 1) {
        this.imageIndex.set(0);
      } else {
        this.imageIndex.set(this.imageIndex() + 1);
      }
    }, 3000);
  };

  ngOnInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
