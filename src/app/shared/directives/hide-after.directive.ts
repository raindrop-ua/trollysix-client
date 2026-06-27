import {
  Directive,
  inject,
  input,
  numberAttribute,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { interval, timer } from 'rxjs';

class HideAfterContext {
  public trollysixHideAfter = 0;
  public counter = 0;

  public trollysixHideAfterThen: TemplateRef<HideAfterContext> | null = null;

  public get $implicit(): number {
    return this.trollysixHideAfter;
  }
}

@Directive({
  selector: '[trollysixHideAfter]',
  standalone: true,
})
export class HideAfterDirective implements OnInit {
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly template =
    inject<TemplateRef<HideAfterContext>>(TemplateRef);
  private readonly destroyRef = inject(DestroyRef);

  private readonly context = new HideAfterContext();

  public readonly delay = input(0, {
    alias: 'trollysixHideAfter',
    transform: (value: number | string | null | undefined) =>
      numberAttribute(value, 0),
  });

  public readonly trollysixHideAfterThen =
    input<TemplateRef<HideAfterContext> | null>(null);

  public ngOnInit(): void {
    const delayValue = this.delay();
    this.context.trollysixHideAfter = delayValue / 1000;
    this.context.counter = this.context.trollysixHideAfter;
    this.context.trollysixHideAfterThen = this.trollysixHideAfterThen();

    this.viewContainerRef.createEmbeddedView(this.template, this.context);

    if (delayValue <= 0) {
      this.showThenTemplate();
      return;
    }

    interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.context.counter > 0) {
          this.context.counter--;
        }
      });

    timer(delayValue)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.showThenTemplate();
      });
  }

  private showThenTemplate(): void {
    this.viewContainerRef.clear();

    if (this.context.trollysixHideAfterThen) {
      this.viewContainerRef.createEmbeddedView(
        this.context.trollysixHideAfterThen,
        this.context,
      );
    }
  }

  public static ngTemplateContextGuard(
    dir: HideAfterDirective,
    ctx: unknown,
  ): ctx is HideAfterContext {
    return ctx instanceof HideAfterContext;
  }
}
