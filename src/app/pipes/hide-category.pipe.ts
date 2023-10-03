import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'hideBeforeColon'
})
export class HideBeforeColonPipe implements PipeTransform {
  transform(value: string): string {
    if (value && value.includes(':')) {
      const parts: string[] = value.split(':');
      if (parts.length > 1) {
        // Return the part after the colon
        return parts[1].trim();
      }
    }
    // If no colon found or only one part, return the original value
    return value;
  }
}
