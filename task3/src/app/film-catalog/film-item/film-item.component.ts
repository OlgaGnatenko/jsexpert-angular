import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Film } from '../../shared/models/film.model';

interface ChangeFavoriteEvent {
  filmId: number;
  favorite: boolean;
}

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})


export class FilmItemComponent implements OnInit {
  @Input() film: Film;
  @Output() changeFavorite = new EventEmitter<ChangeFavoriteEvent>();

  constructor() { }

  toggleFavorites(filmId) {
    this.film.favorite = !this.film.favorite;
    this.changeFavorite.emit({
      filmId,
      favorite: this.film.favorite
    });
  }

  ngOnInit() {
  }

}
