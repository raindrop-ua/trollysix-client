import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';

type IconButtonVariant = 'default' | 'strong' | 'warning';
type IconButtonSize = 'md' | 'sm';

@Directive({
  selector: 'button[trollysixIconButton], a[trollysixIconButton]',
  host: {
    '[class]': 'classes()',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.title]': 'title() || null',
  },
})
export class IconButtonDirective {
  private hostElement = inject(ElementRef<HTMLElement>);

  public variant = input<IconButtonVariant>('default');
  public size = input<IconButtonSize>('md');
  public ariaLabel = input<string>('');
  public title = input<string>('');
  public extraClass = input<string>('');

  public classes = computed(() => {
    return [
      'trollysix-icon-button',
      `trollysix-icon-button--${this.size()}`,
      `trollysix-icon-button--${this.variant()}`,
      this.extraClass(),
    ]
      .filter(Boolean)
      .join(' ');
  });

  constructor() {
    effect(() => {
      const el = this.hostElement.nativeElement;
      if (el.tagName.toLowerCase() === 'button') {
        const btn = el as HTMLButtonElement;
        if (!btn.getAttribute('type')) btn.type = 'button';
      }
    });
  }
}
