import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaType } from '../../classes/Config';
import { Genre } from '../../interfaces/Genre';
import { IQuery } from '../../interfaces/Query';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-select-genres',
  templateUrl: './select-genres.component.html',
  styles: [
  ]
})
export class SelectGenresComponent implements OnInit {

  private mediaType!: MediaType;
  active: boolean = false;
  initial: Genre = { id: 0, name: 'Todos los generos'}
  selected: Genre = this.initial;
  genres: Genre[] = [];

  constructor(
    private mediaService: MediaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.mediaType = params.mediaType;

      this.activatedRoute.queryParams.subscribe( queryParams => {
        this.mediaService.getGenres(this.mediaType)

        .subscribe( items => {
          const genreSelected = items.find(genre => genre.id === Number(queryParams.with_genres))
          this.selected = genreSelected || this.initial;
          this.genres = items;
        });
      })
    });
  }

  showGenres(): void {
    this.active = !this.active;
  }

  selectGenre(genre: Genre) {

    const currentQueryParams = this.activatedRoute.snapshot.queryParams;

    const queryParams: IQuery =  (genre.id)
      ? {...currentQueryParams, with_genres: genre.id } : { }
    this.selected = genre;
    this.router.navigate([], {
      queryParams
    });
    this.active = false;
  }
}
