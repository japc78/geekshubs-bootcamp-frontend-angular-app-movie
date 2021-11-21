import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Media } from '../../interfaces/media';
import { MoviesService } from '../../services/movies.service';

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


  constructor(private movieService: MoviesService) { }

  ngOnInit(): void {
  }

  search(): void {
    this.movieService.findMedia(this.term)
      .pipe(
        map(resp => resp.results.filter(item => item.poster_path))
      )
      .subscribe( resp => {
        if (resp.length > 0) {
          this.results = resp;
        } else {
          this.showAlert();
        }
        console.log(this.results);
      })
      // console.log(this.term);
  }

  showAlert() {
    this.isResults = true;
    setTimeout(() => {
      this.isResults = false;
    }, 3000);
  }
}
