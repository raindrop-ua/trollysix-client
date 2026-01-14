import { DestroyRef, Signal, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { catchError, finalize, switchMap, tap } from 'rxjs/operators';

import { EMPTY, Observable, Subject } from 'rxjs';

export interface ReactiveMethod<TArg, TResult = void> {
  (arg: TArg): void;
  readonly isLoading: Signal<boolean>;
  readonly error: Signal<unknown | null>;
  readonly last: Signal<TResult | null>;
  readonly success: Signal<boolean>;
  readonly reset: () => void;
}

export function reactiveMethod<TArg, TResult>(
  fn: (arg: TArg) => Observable<TResult>,
): ReactiveMethod<TArg, TResult> {
  const destroyRef = inject(DestroyRef);

  const trigger$ = new Subject<TArg>();

  const pending = signal(0);
  const isLoading = computed(() => pending() > 0);

  const error = signal<unknown | null>(null);
  const last = signal<TResult | null>(null);
  const success = signal(false);

  const reset = () => {
    error.set(null);
    success.set(false);
    last.set(null);
  };

  trigger$
    .pipe(
      tap(() => {
        error.set(null);
        success.set(false);
        pending.update((v) => v + 1);
      }),
      switchMap((arg) =>
        fn(arg).pipe(
          tap((value) => {
            last.set(value);
            success.set(true);
          }),
          catchError((err) => {
            error.set(err);
            success.set(false);
            return EMPTY;
          }),
          finalize(() => pending.update((v) => Math.max(0, v - 1))),
        ),
      ),
      takeUntilDestroyed(destroyRef),
    )
    .subscribe();

  const call = (arg: TArg) => trigger$.next(arg);

  return Object.assign(call, {
    isLoading,
    error: error.asReadonly(),
    last: last.asReadonly(),
    success: success.asReadonly(),
    reset,
  });
}
