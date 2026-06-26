import {
  Directive,
  inject,
  Input,
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
  private delayValue = 0;

  @Input('trollysixHideAfter')
  public set delay(value: number | null) {
    this.delayValue = value ?? 0;
    this.context.trollysixHideAfter = this.delayValue / 1000;
    this.context.counter = this.context.trollysixHideAfter;
  }

  @Input()
  public set trollysixHideAfterThen(tpl: TemplateRef<HideAfterContext> | null) {
    this.context.trollysixHideAfterThen = tpl;
  }

  public ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.template, this.context);

    if (this.delayValue <= 0) {
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

    timer(this.delayValue)
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
