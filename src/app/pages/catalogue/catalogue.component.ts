import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { Media } from '../../interfaces/media';
import { Genres, MediaType } from 'src/app/classes/Config';
import { IQuery, QueryMovie } from '../../interfaces/Query';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styles: [
  ]
})
export class CatalogueComponent implements OnInit {

  @ViewChild('catalogueMedia') content!: ElementRef;

  items: Media[] = [];
  private mediaType!: MediaType;
  private totalPages!: number;

  private query: QueryMovie = {
    page: 1
    // "vote_average.gte" : 8,
  };

  @HostListener('window:scroll', ['$event'])
  onScroll() {

  }

  constructor(private mediaService: MediaService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('ngOnInit', this.items.length);

    this.activatedRoute.params.subscribe(params => {
      this.mediaType = params.mediaType;

      this.mediaService.getCatalogue(this.mediaType, this.query )
      .pipe(
        map( resp => {
          this.totalPages = resp.total_pages;
          resp.results = resp.results.filter(item => item.poster_path)
          return resp
        })
        )
        .subscribe( resp => {
          this.items = resp.results;

          // Carga mas items si la lista no tiene scroll
          this.isNotScroll().then(resp =>  {
            if (resp) {
              this.getMoreItems();
            }
          })
        })
      });
  }

  // Check el scroll para carga o no mas items
  private async isNotScroll(): Promise<boolean>  {
    return new Promise<boolean>( resolve => {
      setTimeout(() => {
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        resolve((scrollHeight <= windowHeight && this.items.length > 0 ) ? true : false)
      }, 300);
    });
  }


  private getMoreItems(): void {
    this.mediaService.getCatalogue(this.mediaType, this.query)
      .pipe(
        map( resp => {
          this.totalPages = resp.total_pages;
          resp.results = resp.results.filter(item => item.poster_path)
          return resp
        })
      )
      .subscribe( resp => {
        this.items.push(...resp.results);
      })
  }
}
