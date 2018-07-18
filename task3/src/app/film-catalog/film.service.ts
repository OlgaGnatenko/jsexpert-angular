import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Film, SortingOption, FilmListParams, FilmList } from '../shared/models/film.model';
import { UtilsService } from '../shared/services/utils.service';

@Injectable({
  providedIn: 'root'
})

export class FilmService {
  constructor(private utils: UtilsService) {
    this.films = this._rawFilmList.map((film): Film => ({ ...film, "favorite": this._selectedFilms.has(film.id)} as Film));
    this._sortFilms(this.getDefaultSort().value); // apply initial sort 
  }

  _rawFilmList: Film[] = [
    {id: 1, name: "Тор: Рагнарёк", year: 2017, imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/2NEzIdBAgm4kSYXF4OH86qs3a0u.jpg", description: "Вернувшись в Асгард в поисках таинственного врага, ведущего охоту на Камни Бесконечности, Тор обнаруживает, что действия его брата Локи, захватившего трон Асгарда, привели к приближению наиболее страшного события — Рагнарёка."},
    {id: 2, name: "Чудо-женщина ", year: 2017, imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/fMnMonAyK3nzp1P1odIFzYoSvYe.jpg", description: "Перед тем как стать Чудо-Женщиной, она была Дианой — принцессой амазонок, обученной быть непобедимой воительницей. И когда на берегах огражденного ото внешнего мира райского острова, который служил ей родиной, терпит крушение американский пилот и рассказывает о серьезном конфликте, бушующем во внешнем мире, Диана покидает свой дом, чтобы справиться с этой угрозой"},
    {id: 3, name: "Звёздные Войны: Последние джеда", year: 2017, imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/qP4gdqvE4KsFqkeY9EdVRCA8ahj.jpg", description: "Баланс Силы снова нарушен, и события развиваются с невероятной скоростью! Рей, Финну, вездесущему дроиду BB-8 и другим героям предстоит опасная схватка с могущественным Первым Орденом."},
    {id: 4, name: "Бегущий по лезвию 2049", year: 2017, imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/lxFTHZHBHRXcuzR9ygpMGP1kEKr.jpg", description: "В недалеком будущем мир населен людьми и репликантами, созданными выполнять самую тяжелую работу. Работа офицера полиции Кей - держать репликантов под контролем в условиях нарастающего напряжения"},
    {id: 5, name: "Лига справедливости", year: 2017, imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/e2f1GaWLkk5Sj7cZMi38mUPXYdt.jpg", description: "Понимая, что существуют угрозы, с которыми невозможно справиться в одиночку, Бэтмен и Супермен создают совершенно новую команду, собрав в ней самых могущественных защитников человечества. "},
    {id: 6, name: "Чужой. Завет", year: 2017, imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/5ff1DVsSL7CP5zIjr8ayHaaHScP.jpg", description: "Выжившие члены команды «Прометея» Элизабет и андроид Дэвид сделали первый шаг навстречу разгадке тайны инженеров. Теперь пришло время узнать остальную правду, которая укрыта на родной планете белесых великанов — Рай."},
    {id: 7, name: "Хан Соло: Звёздные Войны. Истории", year: 2018, imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/k7sOpf0TeBPUIix8IL5MGCQMFev.jpg", description: "Фильм расскажет о похождениях юного космического сорвиголовы Хана Соло и его верного напарника Чубакки и о том, как они стали самыми быстрыми пилотами и самыми хитрыми контрабандистами далёкой Галактики."},
    {id: 8, name: "Дэдпул 2", year: 2018, imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/ukbLruQbrchScy3jTXgeAz9IWDL.jpg", description: "Выжив после смертоносной атаки быков, изуродованный шеф-повар кафетерия пытается исполнить свою мечту - стать самым горячим барменом в Мэйберри - и в то же время справиться с потерянными вкусовыми ощущениями. Чтобы восстановить остроту чувств, а еще и потоковый накопитель, Уэйд должен будет сразиться с ниндзями, якудзой и стаей сексуально агрессивных собачек, в то время как он объедет весь земной шар и поймет важность семьи, дружбы и вкуса - а заодно обнаружит новую тягу к приключениям и заработает желанную надпись на кружке «Лучший любовник в мире»."},
    {id: 9, name: "Tomb Raider: Лара Крофт", year: 2018, imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/6NUZPCujVGbewamFAnRfBKy4F4C.jpg", description: "Лара Крофт - весьма самостоятельная дочь эксцентричного искателя приключений, который пропал, едва она стала подростком. Теперь ей двадцать один, она бесцельно проживает свою жизнь, курьером рассекая на байке по забитым улицам восточного Лондона, а ее заработка едва хватает на оплату квартиры и занятий в колледже. Решительно настроенная пробиться сама, она отказывается брать на себя руководство глобальной империей отца, столь же категорично отвергая мысль о том, что он действительно пропал."},
    {id: 10, name: "Стражи Галактики", year: 2014, imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/L6U6zH3N39toWXIjvfPjxgRXuG.jpg", description: "Отважному путешественнику Питеру Квиллу попадает в руки таинственный артефакт, принадлежащий могущественному и безжалостному злодею Ронану, строящему коварные планы по захвату Вселенной. Питер оказывается в центре межгалактической охоты, где жертва — он сам."},
    {id: 11, name: "Тихоокеанский рубеж 2", year: 2018, imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/hAR6AdEKMVQXrcTt1hnaEU7YvSX.jpg", description: "Команда пилотируемых роботов-защитников остановила вторжение гигантских инопланетных монстров. Великая битва за Тихоокеанский рубеж ознаменовала новую главу в истории человечества. Однако война только начинается… Пришло время нового поколения отстаивать своё право на Землю."},
    {id: 12, name: "Интерстеллар", year: 2014, imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/5IGqQ86P8dfpNShocqz8rx38mv0.jpg", description: "Наше время на Земле подошло к концу, команда исследователей берет на себя самую важную миссию в истории человечества; путешествуя за пределами нашей галактики, чтобы узнать есть ли у человечества будущее среди звезд."}
  ];

  _selectedFilms = new Set([1,2,6]); // preselected films as requested in the task 

  films: Film[];

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
        this.films.sort((a: Film, b: Film): number => this.utils.compareStrings(1, a.name, b.name));
        break;
      case 'DESC':
        this.films.sort((a: Film, b: Film): number => this.utils.compareStrings(-1, a.name, b.name));
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
      let safeSearch = search.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
      filmsByParams = filmsByParams.filter((film) => film.name.toLowerCase().search(safeSearch) !== -1);
    }

    const lastPage = (filmsShown >= filmsByParams.length) ? true : false;

    // return given number of pages
    if (filmsShown) {
      filmsByParams = filmsByParams.slice(0, filmsShown);
    }

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
