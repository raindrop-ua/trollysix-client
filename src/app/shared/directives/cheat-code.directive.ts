import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  HostListener,
  effect,
  inject,
  input,
  numberAttribute,
  output,
} from '@angular/core';

@Directive({
  selector: '[trollysixCheatCode]',
})
export class CheatCodeDirective {
  private tpl = inject(TemplateRef);
  private vcr = inject(ViewContainerRef);

  private code = '';
  private buffer = '';
  private lastKeyTime = 0;
  private hasShown = false;

  public readonly trollysixCheatCode = input('', {
    transform: (value: string | null | undefined) =>
      String(value ?? '').toUpperCase(),
  });

  public readonly trollysixCheatCodeTimeout = input(1500, {
    transform: (value: number | string | null | undefined) =>
      numberAttribute(value, 1500),
  });

  public readonly cheatSuccess = output<void>();

  constructor() {
    this.vcr.clear();

    effect(() => {
      this.code = this.trollysixCheatCode();
      this.buffer = '';
    });
  }

  @HostListener('document:keydown', ['$event'])
  public onKeydown(event: KeyboardEvent): void {
    if (!this.code || this.hasShown) {
      return;
    }

    const now = Date.now();

    if (
      this.lastKeyTime &&
      now - this.lastKeyTime > this.trollysixCheatCodeTimeout()
    ) {
      this.buffer = '';
    }

    this.lastKeyTime = now;

    if (event.key.length !== 1) {
      return;
    }

    const char = event.key.toUpperCase();

    this.buffer += char;

    if (this.buffer.length > this.code.length) {
      this.buffer = this.buffer.slice(-this.code.length);
    }

    if (this.buffer === this.code) {
      this.showTemplate();
    }
  }

  private showTemplate(): void {
    if (this.hasShown) {
      return;
    }

    this.cheatSuccess.emit();

    this.hasShown = true;
    this.vcr.createEmbeddedView(this.tpl);
  }
}
