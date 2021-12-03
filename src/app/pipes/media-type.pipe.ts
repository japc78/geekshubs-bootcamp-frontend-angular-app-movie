import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mediaType'
})
export class MediaTypePipe implements PipeTransform {
  transform(value: string ): string {
    return (value==='tv')? 'serie': 'película';
  }
}
