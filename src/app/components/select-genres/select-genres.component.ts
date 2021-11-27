import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { ActivatedRoute } from '@angular/router';
import { MediaType } from '../../classes/Config';
import { Genre } from '../../interfaces/Genre';

@Component({
  selector: 'app-select-genres',
  templateUrl: './select-genres.component.html',
  styles: [
  ]
})
export class SelectGenresComponent implements OnInit {

  private mediaType!: MediaType;
  genres: Genre[] = [];

  constructor(private mediaService: MediaService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.mediaType = params.mediaType;

      this.mediaService.getGenres(this.mediaType)
        .subscribe( items => {
          this.genres = items;
          console.log('Generos', this.genres);
        });
    });
  }

  selectGenre(genreId: number) {

  }
}
