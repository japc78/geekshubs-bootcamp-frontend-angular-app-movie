import { Component, Input, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

}
