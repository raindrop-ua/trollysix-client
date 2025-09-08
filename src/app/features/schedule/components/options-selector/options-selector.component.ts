import { ChangeDetectionStrategy, Component, input, OnInit, signal } from '@angular/core';
import { Option } from './option.model';

@Component({
  selector: 'app-options-selector',
  imports: [],
  templateUrl: './options-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsSelectorComponent implements OnInit {
  public readonly title = input.required<string>();
  public readonly options = input.required<Option[]>();
  public readonly preselected = input<string>();
  public readonly selected = signal<string | null>(null);

  ngOnInit() {
    this.selected.set(this.preselected() ?? this.options()[0].value);
  }

  public select(option: string) {
    this.selected.set(option);
  }
}
