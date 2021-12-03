import { Component, OnInit } from '@angular/core';
import { Media } from '../../interfaces/media';
import { MediaService } from '../../services/media.service';
import { IQuery } from '../../interfaces/Query';


@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styles: [
  ]
})
export class LatestComponent implements OnInit {

  items: Media[] = [];
  private query: IQuery = {

  }

  constructor(private mediaService: MediaService,) { }

  ngOnInit(): void {
    this.mediaService.getLatest().subscribe(resp => {
      this.items = resp;
      // console.log(resp)
    })
  }
}
