import {
  Directive,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  DestroyRef,
} from '@angular/core';
import { interval, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

class HideAfterContext {
  public appHideAfter = 0;
  public counter = 0;

  public appHideAfterThen: TemplateRef<HideAfterContext> | null = null;

  public get $implicit() {
    return this.appHideAfter;
  }
}

@Directive({
  selector: '[appHideAfter]',
  standalone: true,
})
export class HideAfterDirective implements OnInit {
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly template =
    inject<TemplateRef<HideAfterContext>>(TemplateRef);
  private readonly destroyRef = inject(DestroyRef);

  private readonly context = new HideAfterContext();
  private delayValue = 0;

  @Input('appHideAfter')
  set delay(value: number | null) {
    this.delayValue = value ?? 0;
    this.context.appHideAfter = this.delayValue / 1000;
    this.context.counter = this.context.appHideAfter;
  }

  @Input()
  set appHideAfterThen(tpl: TemplateRef<HideAfterContext> | null) {
    this.context.appHideAfterThen = tpl;
  }

  ngOnInit(): void {
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

    if (this.context.appHideAfterThen) {
      this.viewContainerRef.createEmbeddedView(
        this.context.appHideAfterThen,
        this.context,
      );
    }
  }

  static ngTemplateContextGuard(
    dir: HideAfterDirective,
    ctx: unknown,
  ): ctx is HideAfterContext {
    return true;
  }
}
