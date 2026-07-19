import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InvaderInstruction } from "./invader-instruction";

describe("InvaderInstruction", () => {
  let component: InvaderInstruction;
  let fixture: ComponentFixture<InvaderInstruction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvaderInstruction],
    }).compileComponents();

    fixture = TestBed.createComponent(InvaderInstruction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
