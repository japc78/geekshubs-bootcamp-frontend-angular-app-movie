import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SlideShowComponent } from './slide-show/slide-show.component';
import { SwiperModule } from 'swiper/angular';
import { PipesModule } from '../pipes/pipes.module';
import { CarouselComponent } from './carousel/carousel.component';
import { MediaCardComponent } from './media-card/media-card.component';
import { CastCardComponent } from './cast-card/cast-card.component';
import { SelectGenresComponent } from './select-genres/select-genres.component';
import { SortByComponent } from './sort-by/sort-by.component';

@NgModule({
  declarations: [
    SlideShowComponent,
    CarouselComponent,
    MediaCardComponent,
    CastCardComponent,
    SelectGenresComponent,
    SortByComponent,
  ],
  exports: [
    SlideShowComponent,
    CarouselComponent,
    CastCardComponent,
    MediaCardComponent,
    SelectGenresComponent,
    SortByComponent,
  ],
  imports: [
    CommonModule,
    SwiperModule,
    PipesModule,
    FormsModule
  ]
})
export class ComponentsModule { }
