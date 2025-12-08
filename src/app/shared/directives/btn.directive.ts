import {
  Directive,
  HostBinding,
  input,
} from '@angular/core';

type ButtonVariant = 'primary' | 'secondary';

@Directive({
  selector: '[appBtn]',
})
export class BtnDirective {
  public readonly appBtn = input<ButtonVariant>('primary');

  @HostBinding('class')
  get hostClasses(): string {
    const base =
      'cursor-pointer rounded-2xl px-5 py-3 text-sm inline-flex gap-2 items-center justify-center ' +
      'transition active:scale-[.98] ' +
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
      'focus-visible:ring-slate-900/60 dark:focus-visible:ring-white/70 ';

    switch (this.appBtn()) {
      case 'secondary':
        return (
          base +
          'font-medium text-slate-700 ring-1 ring-slate-900/10 ' +
          'hover:bg-slate-900/5 ' +
          'dark:text-slate-200 dark:ring-white/10 dark:hover:bg-white/5'
        );
      case 'primary':
      default:
        return (
          base +
          'font-semibold text-white bg-slate-900 shadow-sm ring-1 ring-black/10 ' +
          'hover:opacity-95 ' +
          'dark:bg-white dark:text-slate-900 dark:ring-white/10'
        );
    }
  }
}
