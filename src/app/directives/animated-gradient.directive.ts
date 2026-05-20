import { Directive, ElementRef, HostListener, Input, Renderer2, OnDestroy, inject } from '@angular/core';
import { IGradientConfiguration } from '../interfaces/IGradientConfiguration';

@Directive({
  selector: '[appAnimatedGradient]',
})
export class AnimatedGradientDirective implements OnDestroy {

  @Input() config: IGradientConfiguration = {};

  private timer: ReturnType<typeof setTimeout> | null = null;
  private el: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2)

  @HostListener('mouseenter')
  onMouseEnter(): void {
    const delay: number = this.config.delay ?? 1000;
    this.timer = setTimeout(() => {
      this.applyBorder();
    }, delay);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.removeBorder();
  }

  private applyBorder(): void {
    const colors: string[] = this.config.colors ?? ['#ff6ec4', '#7873f5'];
    const thickness: string = this.config.thickness ?? '2px';
    const element: HTMLElement = this.el.nativeElement;
    this.renderer.setStyle(
      element,
      'border',
      `${thickness} solid transparent`
    );

    this.renderer.setStyle(
      element,
      'borderImage',
      `linear-gradient(90deg, ${colors.join(', ')}) 1`
    );
  }

  private removeBorder(): void {
    const element: HTMLElement = this.el.nativeElement;

    const styles: string[] = ['border', 'borderImage', 'borderRadius'];

    styles.forEach(style => {
      this.renderer.removeStyle(element, style);
    });
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

}
