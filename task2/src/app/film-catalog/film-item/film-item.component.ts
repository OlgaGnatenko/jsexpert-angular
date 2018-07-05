import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Film } from '../../shared/models/film.model';

interface ChangeFavoriteEvent {
  filmId: number;
  addToFavorite: boolean;
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

  addToFavorites(filmId) {
    this.film.favorite = true;
    this.changeFavorite.emit({
      filmId,
      addToFavorite: true
    });
  }

  removeFromFavorites(filmId) {
    this.film.favorite = false;
    this.changeFavorite.emit({
      filmId,
      addToFavorite: false
    });
  }  
  
  ngOnInit() {
  }

}
