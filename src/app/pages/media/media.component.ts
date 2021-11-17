import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movie';
import { Tv } from '../../interfaces/tv';
import { Config } from '../../classes/Config';
import { Credits, Cast } from '../../interfaces/credits';

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

  }

  public year(release_date: Date): number  {
    return new Date(release_date).getFullYear();
  }

  get getDirector(): string | undefined {
    const director = this.credits.crew.find(p => p.job === 'Director');
    return director?.name;
  }
}