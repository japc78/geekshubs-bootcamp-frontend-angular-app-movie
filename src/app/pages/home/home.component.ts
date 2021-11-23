import { Component, OnInit } from '@angular/core';
import { switchMap, map, filter } from 'rxjs/operators';

import { MediaService } from '../../services/media.service';
import { Movie, MovieResponse } from '../../interfaces/movie';
import { Media } from '../../interfaces/media';
import { MultimediaService } from '../../services/multimedia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public items: Media[] = [];
  constructor(
    private moviesService: MediaService,
    private multiMediaService: MultimediaService,
  ) { }

  ngOnInit(): void {
    // FIXME Como concatenar obserbables y filtrar datos.
    // No se muestren las pelicula que no tengan logo.
    this.moviesService.getTrending()
      .pipe(
        map((movieResponse => movieResponse.results.filter(movie => movie.backdrop_path !== null ))),

        map( movies => {
          movies.forEach(movie => {
            this.multiMediaService.getImages(movie.id, movie.media_type)
            .subscribe( resp => {

              if (resp.logos.length === 1){
                movie.logo = resp.logos[0].file_path;
              } else if (resp.logos.length > 1) {
                const image = (resp.logos.find(logo => logo.iso_639_1 === 'es'))
                  ? resp.logos.find(logo => logo.iso_639_1 === 'es')
                  : resp.logos.find(logo => logo.iso_639_1 === 'en')
                movie.logo = image?.file_path;
              }
            })
          })
            return movies;
        }),

        map( movies => {
          movies.forEach(movie => {
            this.multiMediaService.getVideos(movie.id, movie.media_type)
            .subscribe( resp => {
              // console.log(resp);

              movie.trailer = (resp.results.length > 0) ? resp.results[0].key : null
            })
          })
            return movies;
        }),
      )


        // switchMap((movies => movies.filter( movie => movie.logo === "/m1ZOeUfrVyDOU3G0MkPBIVCS5ay.png")))

      .subscribe( resp => {
        console.log(resp)
        this.items = resp;
      }
    );

    // this.moviesService.getLatestTopRatedMovies().subscribe( resp => {

    //     let moviesTemp: Movie[] = resp.results.filter(movie => movie.backdrop_path !== null );

    //     moviesTemp.forEach(movie => {
    //       this.mediaService.getImages(movie.id, 'movie')
    //         .subscribe( resp => {
    //           movie.logo = (resp.logos.length > 0) ? resp.logos[0].file_path : null
    //         })
    //     });

    //     this.movies = moviesTemp.filter((movie) => {
    //       console.log(movie.logo);

    //       console.log(movie.logo !== null);
    //       return movie.logo !== null
    //     });
    //     console.log(this.movies);
    // });
  }
}
