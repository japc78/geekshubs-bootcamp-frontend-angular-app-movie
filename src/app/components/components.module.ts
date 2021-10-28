import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    SlideShowComponent
  ],
  exports: [
    SlideShowComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
  ]
})
export class ComponentsModule { }
