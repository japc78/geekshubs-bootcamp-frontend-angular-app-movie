import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  credits!: Credits;
  imagePath: String = Config.IMAGE_URL;
  similar!: Media[];


  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MoviesService) { }

  ngOnInit(): void {

    const { type, id } = this.activatedRoute.snapshot.params;
    console.log( type, id);

    this.movieService.getMedia(type ,id).subscribe( media => {
      this.media = media;
      console.log(this.media);
    })

    this.movieService.getCredits(type, id).subscribe(credits => {
      this.credits = credits;
      console.log(this.credits);
    })

    this.movieService.getSimilar(type, id).subscribe(resp => {
      this.similar = resp.results
    })
  }

  get getDirector(): string | undefined {
    const director = this.credits.crew.find(p => p.job === 'Director');
    return director?.name;
  }

  get getCast(): Cast[] {
    return this.credits.cast;
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