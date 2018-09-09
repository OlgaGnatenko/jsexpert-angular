import { ItemList } from './item-list.model';
import { Film } from "./film.model";
import { Person } from "./person.model";

export type CatalogContent = ItemList<Film> | ItemList<Person>;
