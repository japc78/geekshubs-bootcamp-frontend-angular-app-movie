import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { SeriesComponent } from './series/series.component';
import { LatestComponent } from './latest/latest.component';
import { SearchComponent } from './search/search.component';
import { ErrorComponent } from './error/error.component';
import { ComponentsModule } from '../components/components.module';
import { MediaComponent } from './media/media.component';


@NgModule({
  declarations: [
    HomeComponent,
    MoviesComponent,
    SeriesComponent,
    LatestComponent,
    SearchComponent,
    ErrorComponent,
    MediaComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule
  ],
  exports: [
    HomeComponent
  ]
})
export class PagesModule { }
