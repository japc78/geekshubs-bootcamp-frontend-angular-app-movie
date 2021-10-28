import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public movies: Movie[] = [];
  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getLatestTopRatedMovies()
      .subscribe( resp => {
        this.movies = resp.results

        this.movies.forEach(movie => {
          console.log('pass');

          this.moviesService.getMovieImages(movie.id)
            .subscribe( resp => {
              console.log('logo', movie.logo);
              movie.logo = (resp.logos.length > 0) ? resp.logos[0].file_path : ''
            })
        });
      });
  }
}
