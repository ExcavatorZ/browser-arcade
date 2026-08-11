import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";

import { MemoInstruction } from "./memo-instruction";

describe("MemoInstruction", () => {
  let component: MemoInstruction;
  let fixture: ComponentFixture<MemoInstruction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoInstruction],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MemoInstruction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should render the memo instruction text", () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain("Click on a square");
  });
});
