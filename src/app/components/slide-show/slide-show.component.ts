import { Component, Input, OnInit } from '@angular/core';
import SwiperCore, { SwiperOptions, Navigation } from 'swiper';
import { Config } from '../../classes/Config';
import { Media } from '../../interfaces/media';
import { Router } from '@angular/router';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styles: [
  ]
})
export class SlideShowComponent implements OnInit  {

  @Input() items: Media[] = [];

  imagePath: String = Config.IMAGE_URL;
  videoPath: String = Config.VIDEO_URL;

  config: SwiperOptions = {
    slidesPerView: 1,
    navigation: true,
    initialSlide: this.itemRandom(),
    pagination: { clickable: true },
  };

  onSwiper(swiper:any) {
    console.log(swiper);
  }

  onSlideChange() {
    console.log('slide change');
  }

  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }

  // ngOnChanges(): void {
  //   // this.setItemRandom();
  // }

  // FIXME Pasar el valor random al swipper
  // para mostrar un item diferente cada vez.
  private itemRandom(): number {
    return Math.floor(Math.random() * (this.items.length - 1))
  }

  onMoreInformationClick(media: Media) {
    const mediaType = media.media_type;
    this.router.navigate([mediaType, media.id])
  }
}
