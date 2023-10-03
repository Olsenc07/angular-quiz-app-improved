import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'decode'
})
export class SpecialCharacterPipe implements PipeTransform {
  transform(value: string): string {
    // decode url3986 encoding unicode and special characters from api call
    const valueTransform: string = decodeURIComponent(value);
    return valueTransform;
  }
}
