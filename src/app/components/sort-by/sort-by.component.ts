import { Component, OnInit } from '@angular/core';
import { Region, SortBy } from 'src/app/classes/Config';
import { IQuery, QueryMovie } from '../../interfaces/Query';
import { SortOption } from '../../interfaces/SortOption';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaType } from '../../classes/Config';

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styles: [
  ]
})
export class SortByComponent implements OnInit {

  private mediaType!: MediaType;
  private sortOptionsMovie: SortOption[] = [
    {
      id: SortBy.popularity_desc,
      name: 'Mas populares',
    },

    {
      id: SortBy.vote_average_desc,
      name: 'Mejor valoradas',
      query: {
        "vote_count.gte": 500,
        "release_date.lte": new Date().toISOString().split('T')[0],
      }
    },

    {
      id: SortBy.primary_release_date_desc,
      name: 'Mas recientes',
      query: {
        "primary_release_date.lte": new Date().toISOString().split('T')[0],
      }
    },

    {
      id: SortBy.revenue_desc,
      name: 'Más taquilleras',
    }
  ]
  private sortOptionsTv: SortOption[] = [
    {
      id: SortBy.popularity_desc,
      name: 'Mas populares',
    },

    {
      id: SortBy.vote_average_desc, // + ',' + SortBy.vote_count_desc ,
      name: 'Mejor valoradas',
      query: {
        "vote_count.gte": 500,
        "first_air_date.lte": new Date().toISOString().split('T')[0],
      }
    },

    {
      id: SortBy.tv_first_air_date_desc,
      name: 'Mas recientes',
      query: {
        "first_air_date.lte": new Date().toISOString().split('T')[0],
      }
    }
  ]

  private commonQuery: IQuery = {
    watch_region: Region.SPAIN
  }

  sortOptions!: SortOption[];
  active : boolean = false;
  initial: SortOption = this.sortOptionsMovie[0];
  selected: SortOption = this.initial;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.mediaType = params.mediaType;

      this.activatedRoute.queryParams.subscribe( queryParams => {

        this.sortOptions = (this.mediaType === 'movie') ? this.sortOptionsMovie : this.sortOptionsTv;

        const optionSelected = this.sortOptions.find(option => option.id === queryParams.sort_by);
        this.selected = optionSelected || this.initial;
      })
    });



    // this.activatedRoute.queryParams.subscribe( queryParams => {
    //   console.log(queryParams);
    // });
  }

  showOptions(): void {
    this.active = !this.active;
  }

  selectOption(sortOption: SortOption): void {
    const  { with_genres } = this.activatedRoute.snapshot.queryParams;

    const query: IQuery = {
      with_genres,
      ...this.commonQuery,
      ...sortOption.query,
       sort_by: sortOption.id,
    }

    const queryParams: IQuery = (sortOption.id)
      ? query : { }

    this.selected = sortOption;
    this.router.navigate([], {
      queryParams
    })
    this.active = false;
  }
}
