import {
  Component,
  input,
  output,
  signal,
  effect,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';

import { HapticsService } from '@core/services/haptic.service';

import { DayType } from '@features/schedule/data-access/models/daytype.model';
import { Direction } from '@features/schedule/data-access/models/direction.model';
import { Option } from '@features/schedule/data-access/models/option.model';

type OptionLike = Option | DayType | Direction;

@Component({
  selector: 'trollysix-options-selector',
  imports: [],
  templateUrl: './options-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class OptionsSelectorComponent {
  private haptics: HapticsService = inject(HapticsService);
  public readonly title = input.required<string>();
  public readonly options = input.required<OptionLike[]>();
  public readonly preselected = input<string | null | undefined>();
  public readonly selected = signal<string | null>(null);
  public optionSelect = output<string>();

  constructor() {
    effect(() => {
      const options = this.options();
      const pre = this.preselected();

      if (pre) {
        this.selected.set(pre);
        return;
      }

      if (this.selected() === null && options.length) {
        this.selected.set(this.getValue(options[0]));
      }
    });
  }

  public onSelect(option: string) {
    if (this.selected() === option) return;

    this.selected.set(option);
    this.optionSelect.emit(option);
  }

  public onSelectHapticFeedback() {
    this.haptics.trigger();
  }

  public getValue(option: OptionLike): string {
    return 'value' in option ? option.value : option.name;
  }

  public getLabel(option: OptionLike): string {
    return option.label;
  }

  public isDisabled(option: OptionLike): boolean {
    return 'disabled' in option ? !!option.disabled : false;
  }
}
