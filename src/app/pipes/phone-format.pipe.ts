import { Pipe, PipeTransform } from '@angular/core';

type PhoneFormat = 'compact' | 'international' | 'national' | 'masked';

@Pipe({
  name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: string | number, format: PhoneFormat = 'international' ): string {
    if (!value) return '';

    const rawNumbers: string = value.toString().replace(/\D/g, '');
    const country: string = rawNumbers.slice(0, 2);
    const operator: string = rawNumbers.slice(2, 5);
    const group1: string = rawNumbers.slice(5, 8);
    const group2: string = rawNumbers.slice(8, 10);
    const group3: string = rawNumbers.slice(10, 12);

    switch (format) {
      case 'compact':
        return '+' + rawNumbers;
      case 'national':
        return `${operator} ${group1} ${group2} ${group3}`;
      case 'masked':
        return `+${country} ${operator} *** ** ${group3}`;
      case 'international':
      default:
        return `+${country} ${operator} ${group1} ${group2} ${group3}`;
    }

  }

}
