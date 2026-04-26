import { NgClass } from '@angular/common';
import {
  Component,
  signal,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Subject } from 'rxjs';

import { DialogConfig, DialogResult } from '@core/models/dialog.models';

import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'trollysix-dialog',
  standalone: true,
  imports: [NgClass, SvgIconComponent],
  templateUrl: './dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DialogComponent implements OnInit {
  readonly config = signal<DialogConfig | null>(null);
  readonly isVisible = signal(false);

  readonly result$ = new Subject<DialogResult>();

  ngOnInit() {
    setTimeout(() => this.isVisible.set(true), 10);
  }

  close(result: DialogResult) {
    this.isVisible.set(false);
    setTimeout(() => {
      this.result$.next(result);
      this.result$.complete();
    }, 300);
  }

  onBackdropClick() {
    if (!this.config()?.disableClose) this.close('backdrop');
  }

  onConfirmClick() {
    this.close('confirm');
  }

  onCancelClick() {
    this.close('cancel');
  }

  onCancelEvent(event: Event) {
    event.preventDefault();
    const cfg = this.config();
    if (cfg?.disableClose) return;
    this.close('escape');
  }
}
