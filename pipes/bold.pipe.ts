import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'bold'
  
})
export class BoldPipe implements PipeTransform {
  transform(list: string, input: string): string {
    // Create a regular expression object for pattern matching
    //  g is global and i is case-insensitive
    const matchOptions: RegExp = new RegExp(input, 'gi');
    const boldedValueInList = (item: string) =>
      // replace is self explanatory
      item.replace(matchOptions, (match: string) => `<b>${match}</b>`);
    return boldedValueInList(list);
  }
}