import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MemoInstruction } from "./memo-instruction";

describe("MemoInstruction", () => {
  let component: MemoInstruction;
  let fixture: ComponentFixture<MemoInstruction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoInstruction],
    }).compileComponents();

    fixture = TestBed.createComponent(MemoInstruction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
