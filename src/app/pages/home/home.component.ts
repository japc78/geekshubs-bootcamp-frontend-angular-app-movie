import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movie';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public movies: Movie[] = [];
  constructor(
    private moviesService: MoviesService,
    private mediaService: MediaService,
  ) { }

  ngOnInit(): void {
    this.moviesService.getLatestTopRatedMovies()
      .subscribe( resp => {
        this.movies = resp.results.filter(movie => movie.backdrop_path !== null );

        this.movies.forEach(movie => {
          this.mediaService.getImages(movie.id, 'movie')
            .subscribe( resp => {
              movie.logo = (resp.logos.length > 0) ? resp.logos[0].file_path : ''
            })
        });
      });
  }
}
