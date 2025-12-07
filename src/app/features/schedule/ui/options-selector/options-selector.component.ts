import {
  Component,
  input,
  output,
  signal,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  effect,
} from '@angular/core';
import { Option } from '../../data-access/models/option.model';
import { DayType } from '../../data-access/models/daytype.model';
import { Direction } from '../../data-access/models/direction.model';

type OptionLike = Option | DayType | Direction;

@Component({
  selector: 'app-options-selector',
  imports: [],
  templateUrl: './options-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OptionsSelectorComponent {
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

  public select(option: string) {
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
}
