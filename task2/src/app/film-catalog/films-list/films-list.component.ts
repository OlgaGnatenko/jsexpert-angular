import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilmService } from '../film.service';
import { Film } from '../../shared/models/film.model';

@Component({
  selector: '.films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {
  // aditionalTitle: string;
  // description: string = 'Parent component data';
  films: Array<object>
  // films: Array<Film>
  
  constructor(public filmsService: FilmService) {   
  }

  // setUpdatedValue(eventParam){
  //   // this.filmsService
  //   // this.aditionalTitle = eventParam;
  //   // console.log(event);
  // }
  
  ngOnInit() { 
    this.films = this.filmsService.getFilms()
    console.log(this.films);
    
  }
  
}
