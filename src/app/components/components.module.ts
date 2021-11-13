import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { SwiperModule } from 'swiper/angular';
import { PipesModule } from '../pipes/pipes.module';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    SlideShowComponent,
    CarouselComponent
  ],
  exports: [
    SlideShowComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    PipesModule
  ]
})
export class ComponentsModule { }
