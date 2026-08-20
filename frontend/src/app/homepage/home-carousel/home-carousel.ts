import { Component, computed, OnDestroy, OnInit, signal } from "@angular/core";

@Component({
  selector: "app-home-carousel",
  imports: [],
  templateUrl: "./home-carousel.html",
  styleUrl: "./home-carousel.css",
})
export class HomeCarousel implements OnInit, OnDestroy {
  imageIndex = signal(0);
  direction = signal<"left" | "right">("right");
  filepath = "assets/generic/";
  private intervalId!: number;

  currentImage = computed(() => this.images[this.imageIndex()]);

  images = [
    { title: "Learn!", path: `${this.filepath}carousel_0.png`, id: 0 },
    { title: "Have fun!", path: `${this.filepath}carousel_1.png`, id: 1 },
    { title: "Compete!", path: `${this.filepath}carousel_2.png`, id: 2 },
  ];

  prevImage = () => {
    this.direction.set("left");
    this.imageIndex.update((index) => (index - 1 + this.images.length) % this.images.length);
    clearInterval(this.intervalId);
    this.startCarousel();
  };

  nextImage = () => {
    this.direction.set("right");
    this.imageIndex.update((index) => (index + 1) % this.images.length);
    clearInterval(this.intervalId);
    this.startCarousel();
  };

  startCarousel = () => {
    this.intervalId = setInterval(() => {
      this.direction.set("right");
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
