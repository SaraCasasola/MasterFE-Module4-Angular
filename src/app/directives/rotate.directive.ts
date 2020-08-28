import { Directive, Input, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rotate]'
})
export class RotateDirective implements OnInit {
  @Input('rotate') initialRotation: number;
  @Input() step = 10;

  private rotation: number;
  private imgTagName = 'IMG';

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    if (this.el.nativeElement.tagName !== this.imgTagName) { return; }
    this.rotation = Number(this.initialRotation);
    this.setRotation();
  }

  @HostListener('mousedown') onMouseEnter(): void {
    if (this.el.nativeElement.tagName !== this.imgTagName) { return; }
    this.rotation += Number(this.step);
    this.setRotation();
  }

  private setRotation(): void {
    this.el.nativeElement.style.transform = `rotate(${this.rotation}deg)`;
  }

}
