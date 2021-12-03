import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { MediaService } from '../../services/media.service';
import { Media } from '../../interfaces/media';
import { MultimediaService } from '../../services/multimedia.service';
import { MediaType , TimeWindow} from 'src/app/classes/Config';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public items: Media[] = [];
  public trendingMovieLastWeek: Media[] = [];
  public trendingTvLastWeek: Media[] = [];
  constructor(
    private mediaService: MediaService,
    private multiMediaService: MultimediaService,
  ) { }

  ngOnInit(): void {
    // FIXME Como concatenar obserbables y filtrar datos.
    // No se muestren las pelicula que no tengan logo.
    // this.mediaService.getTrending(MediaType.all, TimeWindow.week)
    //   .pipe(
    //     map((mediaResponse => mediaResponse.results.filter(movie => movie.backdrop_path !== null ))),

    //     map( items => {
    //       items.forEach(item => {
    //         this.multiMediaService.getImages(item.id, item.media_type)
    //         .subscribe( resp => {

    //           if (resp.logos.length === 1){
    //             item.logo = resp.logos[0].file_path;
    //           } else if (resp.logos.length > 1) {
    //             const image = (resp.logos.find(logo => logo.iso_639_1 === 'es'))
    //               ? resp.logos.find(logo => logo.iso_639_1 === 'es')
    //               : resp.logos.find(logo => logo.iso_639_1 === 'en')
    //             item.logo = image?.file_path;
    //           }
    //         })
    //       })
    //         return items;
    //     }),

    //     map( items => {
    //       items.forEach(item => {
    //         this.multiMediaService.getVideos(item.id, item.media_type)
    //         .subscribe( resp => {
    //           // console.log(resp);

    //           item.trailer = (resp.results.length > 0) ? resp.results[0].key : null
    //         })
    //       })
    //         return items;
    //     }),
    //   )

    //     // switchMap((movies => movies.filter( movie => movie.logo === "/m1ZOeUfrVyDOU3G0MkPBIVCS5ay.png")))

    //   .subscribe( resp => {
    //     // console.log(resp)
    //     this.items = resp;
    //   }
    // );

    // FIXME Como concatenar obserbables y filtrar datos.
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

    this.setTrending(MediaType.all, TimeWindow.day)
      .subscribe( resp => this.items = resp);

    this.setTrending(MediaType.movie, TimeWindow.week)
      .subscribe( resp => this.trendingMovieLastWeek = resp);

    this.setTrending(MediaType.tv, TimeWindow.week)
      .subscribe( resp => this.trendingTvLastWeek = resp);
  }


  private setTrending(mediaType: MediaType, timeWindow: TimeWindow): Observable<Media[]> {
    return this.mediaService.getTrending(mediaType, timeWindow)
      .pipe(
        map((mediaResponse => mediaResponse.results.filter(item => item.backdrop_path !== null))),

        map(items => {
          items.forEach(item => {
            this.multiMediaService.getImages(item.id, item.media_type)
              .subscribe(resp => {

                if (resp.logos.length === 1) {
                  item.logo = resp.logos[0].file_path;
                } else if (resp.logos.length > 1) {
                  const image = (resp.logos.find(logo => logo.iso_639_1 === 'es'))
                    ? resp.logos.find(logo => logo.iso_639_1 === 'es')
                    : resp.logos.find(logo => logo.iso_639_1 === 'en');
                  item.logo = image?.file_path;
                }
              });
          });
          return items;
        }),

        map(items => {
          items.forEach(item => {
            this.multiMediaService.getVideos(item.id, item.media_type)
              .subscribe(resp => {
                // console.log(resp);
                item.trailer = (resp.results.length > 0) ? resp.results[0].key : null;
              });
          });
          return items.sort(() => Math.random() - 0.5);
        })
      );
  }
}
