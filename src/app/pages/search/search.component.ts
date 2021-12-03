import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, map, mapTo } from 'rxjs/operators';
import { Media } from '../../interfaces/media';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  term!: string;
  results!: Media[];
  isResults: boolean = false;

  // NOTE Para lanzar las sugerencias
  debouncer: Subject<string> = new Subject;
  showSuggestions: boolean = false;
  termSuggestions: string[] = [];


  constructor(private movieService: MediaService) { }

  ngOnInit(): void {

    this.debouncer
    // Tiempo de retardo para buscar la sugerencia del texto introducido
    .pipe( debounceTime(300))
    .subscribe( value => {
      // console.log('debouncer', value);
      // if (value) this.suggestions(value);
      if (value) this.suggestions(value);
    })
  }

  search(): void {
    this.movieService.findMedia(this.term)
      .pipe(
        map(resp => resp.results.filter(item => item.poster_path))
      )
      .subscribe( resp => {
        if (resp.length > 0) {
          this.results = resp;
          this.showSuggestions = false;
        } else {
          this.showAlert();
        }
      })
  }


  searchSuggestion(term: string): void {
    this.term = term;
    this.showSuggestions = false;
    this.search();
  }


  suggestions(term: string): void {
    this.showSuggestions = true;
    this.term = term;
    const setResults = new Set<string>();

    this.movieService.findMedia(term)
      .pipe(
        map(resp => resp.results.filter(item => item.poster_path))
      )
      .subscribe( resp => {
        resp.forEach(item => {
          setResults.add((item.title) ? item.title + '': item.name + '')
        })
        this.termSuggestions = [...setResults].slice(0,5);
        console.log(this.termSuggestions);
      })
  }

  keyPressed() {
    this.debouncer.next(this.term);
  }

  showAlert() {
    this.isResults = true;
    setTimeout(() => {
      this.isResults = false;
    }, 3000);
  }
}
