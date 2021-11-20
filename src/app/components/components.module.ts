import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { SwiperModule } from 'swiper/angular';
import { PipesModule } from '../pipes/pipes.module';
import { CarouselComponent } from './carousel/carousel.component';
import { MediaCardComponent } from './media-card/media-card.component';
import { CastCardComponent } from './cast-card/cast-card.component';

@NgModule({
  declarations: [
    SlideShowComponent,
    CarouselComponent,
    MediaCardComponent,
    CastCardComponent
  ],
  exports: [
    SlideShowComponent,
    CarouselComponent,
    CastCardComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    PipesModule
  ]
})
export class ComponentsModule { }
