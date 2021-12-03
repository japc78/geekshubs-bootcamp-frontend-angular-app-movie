import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MainHeaderComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MainHeaderComponent
  ]
})
export class HeaderModule { }
