import { TestBed } from "@angular/core/testing";

import { InvaderService } from "./invader.service";

describe("InvaderService", () => {
  let service: InvaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvaderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
