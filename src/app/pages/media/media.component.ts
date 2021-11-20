import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movie';
import { Tv, Genre } from '../../interfaces/tv';
import { Config } from '../../classes/Config';
import { Credits, Cast } from '../../interfaces/credits';
import { Media } from '../../interfaces/media';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styles: [
  ]
})
export class MediaComponent implements OnInit {
  media!: Movie & Tv;
  imagePath: String = Config.IMAGE_URL;
  similar!: Media[];
  crew:Cast[] = [];
  cast:Cast[] = [];
  private type! :string;
  private id!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private movieService: MoviesService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.type = params.type;
      // console.log(params);
      this.movieService.getMedia(this.type, this.id).subscribe( media => {
        this.media = media;
        console.log(this.media);
      })

      this.movieService.getCredits(this.type, this.id ).subscribe(credits => {
        this.cast = credits.cast;
        this.crew = credits.crew;
      })

      this.movieService.getSimilar(this.type, this.id ).subscribe(resp => {
        this.similar = resp.results
      })
    })
  }

  get getCrew(): Cast[] {
    const term = ['Director', 'Story', 'Producer'];
    const crew = this.crew.filter(item => item.job && item.profile_path && term.includes(item.job));
    return crew.sort((a,b) => (a.job! > b.job!) ? 1 : ((b.job! > a.job!) ? -1 : 0));
  }

  get getCast(): Cast[] {
    return this.cast.filter(item => item.profile_path);
  }

  get getGenres(): Genre[] {
    return this.media.genres;
  }

  get getSimilar(): Media[] {
    return this.similar;
  }

  public year(release_date: Date): number  {
    return new Date(release_date).getFullYear();
  }
}