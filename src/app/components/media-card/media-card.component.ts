import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Config } from 'src/app/classes/Config';
import { Media } from 'src/app/interfaces/media';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styles: [
  ]
})
export class MediaCardComponent implements OnInit {

  @Input() item!: Media;

  imagePath: String = Config.IMAGE_URL;

  constructor(private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {

  }

  onMediaClick(media: Media) {
    const type = media.media_type || this.activateRoute.snapshot.params.type;
    this.router.navigate([type, media.id])
  }
}
