import { Directive, ElementRef, HostBinding, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appHoverBold]',
})
export class HoverBoldDirective {

  private el: ElementRef = inject(ElementRef);

  @HostBinding('style.fontWeight') fontWeight: string = '';

  @HostListener('mouseenter') onMouseEnter(): void {
    this.fontWeight = 'bold';
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.fontWeight = 'normal';
  }

}
