import { Film } from './film.model';
import { Person } from './person.model';
import { PagedItemList } from './item-list.model';

export class CatalogData {
    films: PagedItemList<Film>;
    persons: PagedItemList<Person>;
}
