import { Component, OnInit } from '@angular/core';
import { SortBy } from 'src/app/classes/Config';

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styles: [
  ]
})
export class SortByComponent implements OnInit {

  active : boolean = false;

  constructor() { }

  ngOnInit(): void {
    const sortOptions = {
      popularity_asc :
      {
        name: "Más populares",
        sortType: SortBy.popularity_desc,
      },

      popularity_desc: {
        name: "Menos populares",
        sortType: SortBy.popularity_desc,
      }
    }
  }

  showOptions(): void {
    this.active = !this.active;
  }

}
