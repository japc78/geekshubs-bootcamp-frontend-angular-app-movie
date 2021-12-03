import { Component } from '@angular/core';
import { GuiService } from './services/gui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {

  title = 'app-movie';
  isDarkMode!: boolean;

  constructor(private guiService: GuiService) {
    this.guiService.darkMode.subscribe(value => this.isDarkMode = value);
  }
}
