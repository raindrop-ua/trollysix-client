import { Directive, HostBinding, input } from '@angular/core';

type ButtonVariant = 'primary' | 'secondary';

@Directive({
  selector: '[trollysixBtn]',
})
export class BtnDirective {
  public readonly trollysixBtn = input<ButtonVariant>('primary');

  @HostBinding('class')
  public get hostClasses(): string {
    return `trollysix-btn trollysix-btn--${this.trollysixBtn()}`;
  }
}
