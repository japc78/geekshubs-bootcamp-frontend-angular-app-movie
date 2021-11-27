import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Config } from 'src/app/classes/Config';
import { Media } from 'src/app/interfaces/media';
import { MediaType } from '../../classes/Config';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styles: [
  ]
})
export class MediaCardComponent implements OnInit {

  @Input() item!: Media;

  imagePath: String = Config.IMAGE_URL;
  private mediaType! : MediaType;

  constructor(private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.mediaType = params.mediaType;
    })

  }

  onMediaClick(media: Media) {
    const mediaType = media.media_type || this.activateRoute.snapshot.params.mediaType;
    this.router.navigate([mediaType, media.id])
  }
}
