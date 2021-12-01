import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { Media } from '../../interfaces/media';
import { Genres, MediaType, SortBy } from 'src/app/classes/Config';
import { IQuery, QueryMovie } from '../../interfaces/Query';
import { ActivatedRoute, Params } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

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
  private today: string = new Date().toISOString().split('T')[0];
  private loading: boolean = false;
  private queryParams!: Params;

  private currentPage = 1;

  private query: QueryMovie = {
    page: this.currentPage,
    // "primary_release_date.lte" : this.today,
    // sort_by: SortBy.original_title_asc
    // "vote_average.gte" : 8,
    // "primary_release_date.gte": new Date().toISOString().split('T')[0],
  };

  // Infinite scroll
  @HostListener('window:scroll', ['$event'])
  onScroll() {

    const scrollPosition = (document.documentElement.scrollTop || document.body.scrollTop ) + 1300;
    const scrollHeight = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (scrollPosition > scrollHeight && !this.loading) {
      this.loading = true;
      // console.log('Query 4: ', {...this.query, ...this.queryParams});
      this.getMoreItems();
    }
  }

  constructor(private mediaService: MediaService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.mediaType = params.mediaType;

      this.activatedRoute.queryParams.subscribe(queryParams => {
        this.queryParams = queryParams;
        this.currentPage = 1;
        this.query.page = this.currentPage;
        // console.log('Query 1: ', {...this.query, ...this.queryParams});

        this.mediaService.getCatalogue(this.mediaType, {...this.query, ...queryParams })
          .subscribe( items => {
            this.items = items;
            this.currentPage +=1;
            this.query.page = this.currentPage;

            // Carga mas items si la lista no tiene scroll
            this.isNotScroll().then( resp =>  {
              if (resp) {
                // console.log('Query 2: ', {...this.query, ...this.queryParams});
                this.getMoreItems();
              }
            })

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
        // console.log('scrollHeight', scrollHeight);
        // console.log('windowHeight', windowHeight);
        resolve((scrollHeight <= (windowHeight + 100) && this.items.length > 0 ) ? true : false)
      }, 300);
    });
  }


  private getMoreItems(): void {
    this.loading = true;
    this.mediaService.getCatalogue(this.mediaType,  {...this.query, ...this.queryParams})
      .subscribe( items => {
        this.items.push(...items);
        this.currentPage +=1;
        this.query.page = this.currentPage;

        if (this.items.length < 20) {
          // console.log('Query 3: ', {...this.query, ...this.queryParams});
          this.getMoreItems();
        }

        this.loading = false
      })
  }
}
