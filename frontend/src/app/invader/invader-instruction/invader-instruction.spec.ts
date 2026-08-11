import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";

import { InvaderInstruction } from "./invader-instruction";

describe("InvaderInstruction", () => {
  let component: InvaderInstruction;
  let fixture: ComponentFixture<InvaderInstruction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvaderInstruction],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(InvaderInstruction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should render the invader instruction text", () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain("Move around as a firewall");
  });
});
