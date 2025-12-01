import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  HostListener,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appCheatCode]',
  standalone: true,
})
export class CheatCodeDirective {
  private tpl = inject(TemplateRef);
  private vcr = inject(ViewContainerRef);

  private code = '';
  private buffer = '';
  private lastKeyTime = 0;
  private hasShown = false;

  @Input()
  set appCheatCode(value: string) {
    this.code = (value ?? '').toUpperCase();
    this.buffer = '';
  }

  @Input()
  appCheatCodeTimeout = 1500;

  constructor() {
    this.vcr.clear();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (!this.code || this.hasShown) {
      return;
    }

    const now = Date.now();

    if (this.lastKeyTime && now - this.lastKeyTime > this.appCheatCodeTimeout) {
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

  private showTemplate() {
    if (this.hasShown) {
      return;
    }
    this.hasShown = true;
    this.vcr.createEmbeddedView(this.tpl);
  }
}
