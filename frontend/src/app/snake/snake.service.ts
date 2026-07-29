import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class SnakeService {
  private http = inject(HttpClient);
  url = environment.apiBaseUrl + "/Snake/save";

  saveResult = (score: number) => {
    this.http.post(this.url, score).subscribe({
      next: () => {},
      error: (err) => console.error(err),
    });
  };
}
