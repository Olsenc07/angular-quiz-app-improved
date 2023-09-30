import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'typeof'
})
export class TypeOfPipe implements PipeTransform {
  transform(value: any): boolean {
    return typeof value === 'object';
  }
}
