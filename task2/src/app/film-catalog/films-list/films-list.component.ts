import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilmService } from '../film.service';
import { Film } from '../../shared/models/film.model';

export interface SortingOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})

export class FilmsListComponent implements OnInit {
  favoritesCount = 0;
  films: Array<Film>;
  sortingOptions: SortingOption[] = [
    {
      value: 'ASC',
      viewValue: 'По алфавиту: A-Z'
    },
    {
      value: 'DESC',
      viewValue: 'По алфавиту: Z-A'
    }
  ];

  constructor(public filmsService: FilmService) {
  }

  // setUpdatedValue(eventParam){
  //   // this.filmsService
  //   // this.aditionalTitle = eventParam;
  //   // console.log(event);
  // }

  ngOnInit() {
    this.films = this.filmsService.getFilms();
  }

  sortFilms(evt) {
    if (!evt) {
      return;
    }
    const { value } = evt;
    switch (value) {
      case 'ASC':
        this.films.sort((a: Film, b: Film): number => {
          if (a.name < b.name) { return -1; }
          if (a.name === b.name) { return 0; }
          return 1;
        });
        break;
      case 'DESC':
        this.films.sort((a: Film, b: Film): number => {
          if (a.name > b.name) { return -1; }
          if (a.name === b.name) { return 0; }
          return 1;
        });
        break;
    }
  }

  updateFavorites(evt) {
    if (!evt) {
      return;
    }
    const {filmId, favorite} = evt;
    favorite ? this.favoritesCount++ : this.favoritesCount--;
  }

}
