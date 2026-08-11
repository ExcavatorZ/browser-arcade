import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Homepage } from "./homepage";

describe("Homepage", () => {
  let component: Homepage;
  let fixture: ComponentFixture<Homepage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Homepage],
    }).compileComponents();

    fixture = TestBed.createComponent(Homepage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should render the body text", () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain("Welcome to Browser Arcade!");
  });
});
