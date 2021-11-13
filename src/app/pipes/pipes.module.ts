import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './truncate.pipe';
import { MediaTypePipe } from './media-type.pipe';



@NgModule({
  declarations: [
    TruncatePipe,
    MediaTypePipe
  ],
  exports: [
    TruncatePipe,
    MediaTypePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
