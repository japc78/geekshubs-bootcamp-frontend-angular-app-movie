import { Component, OnInit } from '@angular/core';
import { GuiService } from '../../../services/gui.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styles: [
  ]
})
export class MainHeaderComponent implements OnInit {
  isDarkMode!: boolean;

  constructor(private guiService: GuiService) {
    guiService.darkMode.subscribe(value => this.isDarkMode = value);
  }

  ngOnInit(): void {
  }

  darkMode():void {
    // this.guiService.setDarkMode(!this.guiService.getDarkMode);
    this.guiService.toggleDarkMode();
    console.log(this.isDarkMode);
  }
}
