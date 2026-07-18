import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MemoPlay } from "./memo-play";

describe("MemoPlay", () => {
  let component: MemoPlay;
  let fixture: ComponentFixture<MemoPlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoPlay],
    }).compileComponents();

    fixture = TestBed.createComponent(MemoPlay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
