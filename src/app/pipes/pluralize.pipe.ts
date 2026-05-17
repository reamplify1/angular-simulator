import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize',
})
export class PluralizePipe implements PipeTransform {

  transform(value: number, one: string, few: string, many: string): string {

    const lastOne: number = value % 10;
    const lastTwo: number = value % 100;

    if (lastTwo >= 11 && lastTwo <= 14) {
      return `${value} ${many}`;
    } else if (lastOne === 1) {
      return `${value} ${one}`;
    } else if (lastOne >= 2 && lastOne <= 4) {
      return `${value} ${few}`;
    } else {
      return `${value} ${many}`;
    }
  }

}
