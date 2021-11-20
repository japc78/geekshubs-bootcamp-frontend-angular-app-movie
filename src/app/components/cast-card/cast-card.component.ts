import { Component, OnInit, Input } from '@angular/core';
import { Config } from 'src/app/classes/Config';
import { Cast } from '../../interfaces/credits';

@Component({
  selector: 'app-cast-card',
  templateUrl: './cast-card.component.html',
  styles: [
  ]
})
export class CastCardComponent implements OnInit {

  @Input() cast!: Cast;

  imagePath: String = Config.IMAGE_URL;

  constructor() { }

  ngOnInit(): void {
  }

}
