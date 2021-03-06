import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { SeriesComponent } from './pages/series/series.component';
import { LatestComponent } from './pages/latest/latest.component';
import { SearchComponent } from './pages/search/search.component';
import { ErrorComponent } from './pages/error/error.component';
import { MediaComponent } from './pages/media/media.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'series', component: SeriesComponent },
  { path: 'latest', component: LatestComponent },
  { path: 'search', component: SearchComponent },
  { path: 'catalogue/:mediaType', component: CatalogueComponent },
  { path: ':mediaType/:id', component: MediaComponent, pathMatch: 'full' },
  { path: '404', component: ErrorComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
