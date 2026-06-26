import {
  Component,
  input,
  output,
  signal,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';

import { DayType } from '@features/schedule/data-access/models/daytype.model';
import { Direction } from '@features/schedule/data-access/models/direction.model';
import { Option } from '@features/schedule/data-access/models/option.model';

type OptionLike = Option | DayType | Direction;

let selectorIdCounter = 0;

@Component({
  selector: 'trollysix-options-selector',
  imports: [],
  templateUrl: './options-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class OptionsSelectorComponent {
  public readonly title = input.required<string>();
  public readonly options = input.required<OptionLike[]>();
  public readonly preselected = input<string | null | undefined>();
  public readonly selected = signal<string | null>(null);
  public optionSelect = output<string>();
  public readonly selectorId = ++selectorIdCounter;
  public readonly titleId = `options-selector-title-${this.selectorId}`;
  public readonly groupId = `options-selector-group-${this.selectorId}`;

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

  public onSelect(option: string): void {
    if (this.selected() === option) return;

    this.selected.set(option);
    this.optionSelect.emit(option);
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

  public getOptionId(value: string): string {
    return `${this.groupId}-option-${value}`;
  }
}
