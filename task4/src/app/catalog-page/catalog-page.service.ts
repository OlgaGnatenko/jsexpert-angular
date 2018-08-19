import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemList, ListParams, CatalogData } from '../shared/models/catalog-item.model';
import { APIConfig } from './api.config';
import { APIParams, APIResponse } from '../shared/models/api-params.model';
import { Film } from '../shared/models/film.model';
import { Person } from '../shared/models/person.model';
import { CatalogOption } from '../shared/models/catalog-option.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UtilsService } from '../shared/services/utils.service';
import { MAX_FILM_TITLE_LENGTH, MAX_FILM_DESCR_LENGTH, MAX_PERSON_NAME_LENGTH, MAX_PERSON_DESCR_LENGTH } from '../shared/constants';

@Injectable({
    providedIn: 'root'
})

export class CatalogPageService {
    data: CatalogData;

    constructor(private http: HttpClient, private utils: UtilsService ) {
        this.data = {
            films: {
                items: [],
                currentPage: 0,
                totalPages: 0,
                totalItems: 0
            },
            persons: {
                currentPage: 0,
                totalPages: 0,
                totalItems: 0
            }
        };
    }


    getItemsByParams<T>(listParams: ListParams): Array<T> {
        const { search, itemsShown, searchField } = listParams;
        let itemsByParams: Array<T>;
        // return given number of pages
        if (itemsShown) {
            itemsByParams = itemsByParams.slice(0, itemsShown);
        }
        // apply search
        if (search && searchField) {
            // remove special symbols to make search safe
            const safeSearch = search.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
            itemsByParams = itemsByParams.filter((item) => item[searchField].toLowerCase().search(safeSearch) !== -1);
        }
        return itemsByParams.slice();
    }

    loadMoreItems<T>(apiParams: APIParams): Observable<ItemList<T>> {
        return this.http.get(apiParams.URL)
            .pipe(
                map((data: Response) => {
                    console.log("pipe response", data);
                    const json = data.json();
                    const currentPage = json["page"];
                    const totalPages = json["totalPages"];
                    const totalItems = json["totalItems"];
                    const items = this.processItems(json["results"]) as Array<T>;
                    return {
                        currentPage,
                        totalPages,
                        totalItems,
                        items
                    } as ItemList<T>;
                })
            );
    }

    processFilms<T>(rawFilms: Array<T>): Array<T> {
        const newFilms = rawFilms.map((film: T): Film => ({
            id: film["id"],
            title: film["title"],
            overview: film["overview"],
            releaseDate: film["release_date"],
            posterPath: film["poster_path"],
            voteAverage: film["vote_average"],
            favorite: false,
            shortTitle: this.utils.truncateString(film["title"], MAX_FILM_TITLE_LENGTH),
            shortOverview: this.utils.truncateString(film["overview"], MAX_FILM_DESCR_LENGTH),
            year: new Date(film["release_date"]).getFullYear()
        } as Film));
        const films = this.data.films.items;
        return films.push.apply(films, newFilms).slice();
    }

    processPersons<T>(rawPersons: Array<T>): Array<T> {
        const newPersons = rawPersons.map((person: T): Person => {
            const filmsKnown = person["known_for"].reduce((item: Object): string => (item["title"] || item["name"]) + "\n", "");
            return {
                id: person["id"],
                name: person["name"],
                posterPath: person["poster_path"],
                popularity: person["vote_average"] / 5, // to translate from scale 1..50 to scale 1..10
                filmsKnown,
                favorite: false,
                shortName: this.utils.truncateString(person["name"], MAX_PERSON_NAME_LENGTH),
                shortFilmsKnown: this.utils.truncateString(filmsKnown, MAX_PERSON_DESCR_LENGTH)
            } as Person;
        });
        const persons = this.data.persons.items;
        return persons.push.apply(persons, newPersons).slice();
    }

    processItems<T>(items: Array<T>): Array<T> {
        if (items.length === 0) {
            return items;
        }

        if (items[0] instanceof Film) {
            return this.processFilms(items);
        }
        if (items[0] instanceof Person) {
            return this.processPersons(items);
        }
        return items;
    }

}


