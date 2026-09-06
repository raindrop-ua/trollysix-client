import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  inject,
  ChangeDetectionStrategy,
  effect,
  PLATFORM_ID,
  signal,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';

import { copy } from '@core/content';

import { ScheduleService } from '@features/schedule/application/services/schedule.service';
import { Departure } from '@features/schedule/data-access/models/departure.model';
import {
  selectSelectedStopId,
  selectSelectedStopName,
  selectTimetableLoading,
} from '@features/schedule/data-access/store/schedule.selectors';

@Component({
  selector: 'trollysix-departure-stop-bar',
  imports: [],
  templateUrl: './departure-stop-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DepartureStopBarComponent {
  private static readonly typingDelayMs = 35;

  public readonly copySchedule = copy('schedule');
  private readonly store = inject(Store);
  private readonly schedule: ScheduleService = inject(ScheduleService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  public readonly departures: Signal<Departure[]> = toSignal(
    this.schedule.departures$,
    {
      initialValue: [],
    },
  );
  public readonly selectedStopName: Signal<string | null> =
    this.store.selectSignal(selectSelectedStopName);
  public readonly selectedStopId: Signal<string | null> =
    this.store.selectSignal(selectSelectedStopId);
  public readonly timetableLoading: Signal<boolean> = this.store.selectSignal(
    selectTimetableLoading,
  );
  public readonly displayedStopName = signal('');
  public readonly isTypingStopName = signal(false);
  public readonly revealKey = signal(0);

  private previousLoading = true;
  private previousStopId: string | null = null;
  private hasAnimatedStopName = false;

  constructor() {
    effect((onCleanup) => {
      const stopName = this.selectedStopName() ?? '';
      const reduceMotion =
        this.isBrowser &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

      if (!this.isBrowser || reduceMotion || !stopName) {
        this.displayedStopName.set(stopName);
        this.isTypingStopName.set(false);
        return;
      }

      const characters = Array.from(stopName);
      let characterIndex = 0;
      let typingTimeout: ReturnType<typeof setTimeout> | undefined;

      const typeNextCharacter = () => {
        characterIndex += 1;
        this.displayedStopName.set(
          characters.slice(0, characterIndex).join(''),
        );

        if (characterIndex === characters.length) {
          this.isTypingStopName.set(false);
          return;
        }

        typingTimeout = setTimeout(
          typeNextCharacter,
          DepartureStopBarComponent.typingDelayMs,
        );
      };

      const startTyping = () => {
        this.displayedStopName.set('');
        this.isTypingStopName.set(true);
        typeNextCharacter();
      };

      if (this.hasAnimatedStopName) {
        startTyping();
      } else {
        this.displayedStopName.set(stopName);
        this.hasAnimatedStopName = true;
        typingTimeout = setTimeout(startTyping);
      }

      onCleanup(() => clearTimeout(typingTimeout));
    });

    effect(() => {
      const loading = this.timetableLoading();
      const hasDepartures = this.departures().length > 0;
      const selectedStopId = this.selectedStopId();

      const loadingFinished = this.previousLoading && !loading && hasDepartures;
      const stopChanged =
        selectedStopId !== this.previousStopId && !loading && hasDepartures;

      if (loadingFinished || stopChanged) {
        this.revealKey.update((value) => value + 1);
      }

      this.previousLoading = loading;
      this.previousStopId = selectedStopId;
    });
  }
}
