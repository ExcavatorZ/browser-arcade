import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeCarousel } from "./home-carousel";

const mockImages = [
  { title: "test_title0", path: "test_image0", id: 0 },
  { title: "test_title1", path: "test_image1", id: 1 },
  { title: "test_title2", path: "test_image2", id: 2 },
];

describe("HomeCarousel", () => {
  let component: HomeCarousel;
  let fixture: ComponentFixture<HomeCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCarousel],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeCarousel);
    fixture.componentInstance.images = mockImages;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should render carousel title", () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain("test_title0");
  });

  it("should render initial image", () => {
    const image = fixture.nativeElement.querySelector("img") as HTMLImageElement;

    expect(image.src).toContain("test_image0");
  });

  it("should render next image on click", () => {
    const buttons = fixture.nativeElement.querySelectorAll("button");
    const compiled = fixture.nativeElement as HTMLElement;

    const nextButton = buttons[1] as HTMLButtonElement;

    nextButton.click();
    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector("img") as HTMLImageElement;

    expect(compiled.textContent).toContain("test_title1");
    expect(image.src).toContain("test_image1");
  });

  it("should render previous image on click and wrap around", () => {
    const buttons = fixture.nativeElement.querySelectorAll("button");
    const compiled = fixture.nativeElement as HTMLElement;

    const prevButton = buttons[0] as HTMLButtonElement;

    prevButton.click();
    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector("img") as HTMLImageElement;

    expect(compiled.textContent).toContain("test_title2");
    expect(image.src).toContain("test_image2");
  });
});
