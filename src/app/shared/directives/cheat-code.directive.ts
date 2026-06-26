import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  HostListener,
  inject,
  Output,
  EventEmitter,
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

  @Input()
  public set trollysixCheatCode(value: string) {
    this.code = (value ?? '').toUpperCase();
    this.buffer = '';
  }

  @Input()
  public trollysixCheatCodeTimeout = 1500;

  @Output()
  public cheatSuccess = new EventEmitter<void>();

  constructor() {
    this.vcr.clear();
  }

  @HostListener('document:keydown', ['$event'])
  public onKeydown(event: KeyboardEvent): void {
    if (!this.code || this.hasShown) {
      return;
    }

    const now = Date.now();

    if (
      this.lastKeyTime &&
      now - this.lastKeyTime > this.trollysixCheatCodeTimeout
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
