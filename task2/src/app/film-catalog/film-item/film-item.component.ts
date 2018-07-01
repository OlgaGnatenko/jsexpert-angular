import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Film } from '../../shared/models/film.model';

@Component({
  selector: 'film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {
  @Input() film: Film;
  @Input('info') infoBlock: string;
  @Output() update = new EventEmitter<string>();
  
  value: string;
  constructor() { }

  setToParent(el){
    this.update.emit((el && el.innerHTML) || this.value);
  }

  ngOnInit() {
  }

}
