import { Injectable } from '@angular/core';
import { UtilsService } from '../shared/services/utils.service';
import { Film } from '../shared/models/film.model';
import { MAX_FILM_TITLE_LENGTH, MAX_FILM_DESCR_LENGTH, MAX_PERSON_NAME_LENGTH, MAX_PERSON_DESCR_LENGTH } from '../shared/constants';
import { Person } from '../shared/models/person.model';
import { APIConfig } from './api.config';

@Injectable()

export class ProcessDataService {
    constructor(private utils: UtilsService, private config: APIConfig) {}


    processFilms(rawFilms: Array<object>): Array<Film> {
        return rawFilms.map((film: object): Film => ({
            id: film["id"],
            title: film["title"],
            overview: film["overview"],
            releaseDate: film["release_date"],
            posterPath: this.config.smallImgPath + film["poster_path"],
            voteAverage: film["vote_average"],
            favorite: false,
            shortTitle: this.utils.truncateString(film["title"], MAX_FILM_TITLE_LENGTH),
            shortOverview: this.utils.truncateString(film["overview"], MAX_FILM_DESCR_LENGTH),
            year: new Date(film["release_date"]).getFullYear()
        } as Film));
    }

    processPersons(rawPersons: Array<object>): Array<Person> {
        return rawPersons.map((person: object): Person => {
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
    }

    processItems<T>(type: string, items: Array<object>): Array<Film>|Array<Person> {
        if (items.length === 0) {
            return [];
        }

        if (type === "films") {
            return this.processFilms(items);
        }
        if (type === "persons") {
            return this.processPersons(items);
        }
        // if type is not films or persons, processing is not applicable
        return [];
    }
}
