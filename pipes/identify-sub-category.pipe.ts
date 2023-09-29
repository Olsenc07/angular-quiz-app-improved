import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'subCategory'
})
export class IdentifySubCategoryPipe implements PipeTransform {
  transform(value: string): string | { category: string, subCategory: string } {
    if (value && value.includes(':')) {
      // Split the string by colon and return both parts
      const [category, subCategory]: string[] = value.split(':');
      return { category, subCategory };
    }
    return value;
  }
}