import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatRating } from '@bg-hoard/store/util-formatters';
import { Game } from '@bg-hoard/util-interface';

@Component({
  selector: 'bg-hoard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private http: HttpClient) {
    console.log('component constructed');
  }

  title = 'Board Game Hoard';
  formatRating = formatRating;
  games = this.http.get<Game[]>('/api/games');
}
