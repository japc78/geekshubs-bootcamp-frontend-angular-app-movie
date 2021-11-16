import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onMediaClick(media: Media) {
    console.log(media);
    this.router.navigate([media.media_type, media.id])
  }
}
