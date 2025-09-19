import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { Option } from '../../data-access/models/option.model';

@Component({
  selector: 'app-options-selector',
  imports: [],
  templateUrl: './options-selector.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsSelectorComponent implements OnInit {
  public readonly title = input.required<string>();
  public readonly options = input.required<Option[]>();
  public readonly preselected = input<string>();
  public readonly selected = signal<string | null>(null);
  public optionSelect = output<string>();

  ngOnInit() {
    this.selected.set(this.preselected() ?? this.options()[0].value);
  }

  public select(option: string) {
    this.selected.set(option);
    this.optionSelect.emit(option);
  }
}
