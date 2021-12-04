import { NumberFormatStyle } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuiService {

  isDarkMode: boolean = false;
  darkMode: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.darkMode.next(this.isDarkMode)
    console.log('Service', this.isDarkMode);
  }
}
