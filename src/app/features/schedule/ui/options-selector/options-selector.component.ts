import {
  Component,
  input,
  output,
  signal,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { Option } from '../../data-access/models/option.model';

@Component({
  selector: 'app-options-selector',
  imports: [],
  templateUrl: './options-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OptionsSelectorComponent implements OnInit {
  public readonly title = input.required<string>();
  public readonly options = input.required<Option[]>();
  public readonly preselected = input<string | null| undefined>();
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
