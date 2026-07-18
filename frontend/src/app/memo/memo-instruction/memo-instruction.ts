import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MemoService } from "../memo.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-memo-instruction",
  imports: [RouterLink, FormsModule],
  templateUrl: "./memo-instruction.html",
})
export class MemoInstruction {
  service = inject(MemoService);

  amountInput!: number;
}
