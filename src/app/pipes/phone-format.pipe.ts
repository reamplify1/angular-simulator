import { Pipe, PipeTransform } from '@angular/core';
import { PhoneFormat } from '../../enums/PhoneFormat';

@Pipe({
  name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: string | number, format: PhoneFormat = PhoneFormat.INTERNATIONAL): string {
    if (!value) return '';

    const rawNumbers: string = value.toString().replace(/\D/g, '');
    const country: string = rawNumbers.slice(0, 2);
    const operator: string = rawNumbers.slice(2, 5);
    const group1: string = rawNumbers.slice(5, 8);
    const group2: string = rawNumbers.slice(8, 10);
    const group3: string = rawNumbers.slice(10, 12);

    switch (format) {
      case PhoneFormat.COMPACT:
        return `+${ rawNumbers }`;
      case PhoneFormat.NATIONAL:
        return `${ operator } ${ group1 } ${ group2 } ${ group3 }`;
      case PhoneFormat.MASKED:
        return `+${ country } ${ operator } *** ** ${ group3 }`;
      case PhoneFormat.INTERNATIONAL:
        return `+${ country } ${ operator } ${ group1 } ${ group2 } ${ group3 }`;
    }
  }

}
