import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Person } from '../shared/models/film.model';
import { UtilsService } from '../shared/services/utils.service';
import { MAX_PERSON_NAME_LENGTH, MAX_PERSON_DESCR_LENGTH } from '../shared/models/constants.model';

@Injectable({
  providedIn: 'root'
})

export class PersonService {
  constructor(private utils: UtilsService) {
    this.persons = this._rawPersonList.map((person): Person => ({
      ...person,
      "favorite": false,
      "shortName": utils.truncateString(person.name, MAX_PERSON_NAME_LENGTH),
      "shortFilmsKnown": utils.truncateString(person.filmsKnown, MAX_PERSON_DESCR_LENGTH)
    } as Person));
  }

  _rawPersonList: Person[] = [
    { id: 1, name: "Monica Bellucci", posterPath: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/2NEzIdBAgm4kSYXF4OH86qs3a0u.jpg", popularity: 6.35, filmsKnown: "The Matrix Revolutions\nThe Matrix Reloaded" },
    { id: 1, name: "Monica Bellucci", posterPath: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/2NEzIdBAgm4kSYXF4OH86qs3a0u.jpg", popularity: 6.35, filmsKnown: "The Matrix Revolutions\nThe Matrix Reloaded" },
    { id: 1, name: "Monica Bellucci", posterPath: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/2NEzIdBAgm4kSYXF4OH86qs3a0u.jpg", popularity: 6.35, filmsKnown: "The Matrix Revolutions\nThe Matrix Reloaded" },
    { id: 1, name: "Monica Bellucci", posterPath: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/2NEzIdBAgm4kSYXF4OH86qs3a0u.jpg", popularity: 6.35, filmsKnown: "The Matrix Revolutions\nThe Matrix Reloaded" },
    { id: 1, name: "Monica Bellucci", posterPath: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/2NEzIdBAgm4kSYXF4OH86qs3a0u.jpg", popularity: 6.35, filmsKnown: "The Matrix Revolutions\nThe Matrix Reloaded" },
    { id: 1, name: "Monica Bellucci", posterPath: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/2NEzIdBAgm4kSYXF4OH86qs3a0u.jpg", popularity: 6.35, filmsKnown: "The Matrix Revolutions\nThe Matrix Reloaded" },
    { id: 1, name: "Monica Bellucci", posterPath: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/2NEzIdBAgm4kSYXF4OH86qs3a0u.jpg", popularity: 6.35, filmsKnown: "The Matrix Revolutions\nThe Matrix Reloaded" },
    { id: 1, name: "Monica Bellucci", posterPath: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/2NEzIdBAgm4kSYXF4OH86qs3a0u.jpg", popularity: 6.35, filmsKnown: "The Matrix Revolutions\nThe Matrix Reloaded" },
    { id: 1, name: "Monica Bellucci", posterPath: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/2NEzIdBAgm4kSYXF4OH86qs3a0u.jpg", popularity: 6.35, filmsKnown: "The Matrix Revolutions\nThe Matrix Reloaded" }
  ];

  _selectedFilms = new Set([1, 2, 6]); // preselected films as requested in the task

  persons: Person[];

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

  private _sortFilms(sortString: string) {
    switch (sortString) {
      case 'ASC':
        this.films.sort((a: Film, b: Film): number => this.utils.compareStrings(1, a.title, b.title));
        break;
      case 'DESC':
        this.films.sort((a: Film, b: Film): number => this.utils.compareStrings(-1, a.title, b.title));
        break;
    }
  }

  getFilmsByParams(filmListParams: FilmListParams, applySearchAfterList: Boolean = false): FilmList {
    const { sort, search, filmsShown } = filmListParams;

    this._sortFilms(sort);
    let filmsByParams = this.films.slice();

    // apply search
    if (search && !applySearchAfterList) {
      // remove special symbols to make search safe
      const safeSearch = search.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
      filmsByParams = filmsByParams.filter((film) => film.title.toLowerCase().search(safeSearch) !== -1);
    }

    const lastPage = (filmsShown >= filmsByParams.length) ? true : false;

    // return given number of pages
    if (filmsShown) {
      filmsByParams = filmsByParams.slice(0, filmsShown);
    }
    console.log(filmsByParams);
    return {
      films: filmsByParams,
      lastPage
    };
  }

  getSortingOptions(): Array<SortingOption> {
    return this.sortingOptions.slice();
  }

  getFavoritesCount(): number {
    return this._selectedFilms.size;
  }

  getDefaultSort(): SortingOption {
    return Object.assign(this.sortingOptions[0]);
  }

}
