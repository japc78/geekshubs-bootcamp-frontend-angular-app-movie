import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaType } from '../../classes/Config';
import { Genre } from '../../interfaces/Genre';
import { IQuery } from '../../interfaces/Query';

@Component({
  selector: 'app-select-genres',
  templateUrl: './select-genres.component.html',
  styles: [
  ]
})
export class SelectGenresComponent implements OnInit {

  private mediaType!: MediaType;

  isGenres: boolean = false;

  genres: Genre[] = [];

  constructor(
    private mediaService: MediaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.mediaType = params.mediaType;

      this.mediaService.getGenres(this.mediaType)
        .subscribe( items => {
          this.genres = items;
        });
    });
  }

  showGenres(): void {
    this.isGenres = !this.isGenres;
  }

  selectGenre(genreId: number) {
    const queryParams: IQuery =  (genreId)
      ? { with_genres: genreId } : { }
    this.router.navigate([], {
      queryParams
    });
    this.isGenres = false;
  }
}
