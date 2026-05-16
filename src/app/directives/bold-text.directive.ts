import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverBold]',
})
export class HoverBoldDirective {

  constructor(private el: ElementRef) { }

  @HostBinding('style.fontWeight') fontWeight: string = '';

  @HostListener('mouseenter') onMouseEnter(): void {
    this.fontWeight = 'bold'
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.fontWeight = 'normal'
  }

}
