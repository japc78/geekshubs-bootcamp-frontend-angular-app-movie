import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styles: [
  ]
})
export class MediaComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MoviesService) { }

  ngOnInit(): void {

    const { type, id } = this.activatedRoute.snapshot.params;
    console.log( type, id);

    this.movieService.getMedia(type,id).subscribe( media => {
      console.log(media);
    })
  }
}
