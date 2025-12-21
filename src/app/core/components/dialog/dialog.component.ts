import {
  Component,
  signal,
  inject,
  PLATFORM_ID,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { DialogConfig, DialogResult } from '../../models/dialog.models';
import { SvgIconComponent } from '../../../shared/components';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [NgClass, SvgIconComponent],
  templateUrl: './dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class DialogComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly config = signal<DialogConfig | null>(null);
  readonly isVisible = signal(false);

  readonly result$ = new Subject<DialogResult>();

  ngOnInit() {
    setTimeout(() => this.isVisible.set(true), 10);

    if (this.isBrowser) {
      document.body.style.overflow = 'hidden';
    }
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
    if (!this.config()?.disableClose) this.close('confirm');
  }

  onCancelClick() {
    if (!this.config()?.disableClose) this.close('cancel');
  }

  onCancelEvent(event: Event) {
    event.preventDefault();
    const cfg = this.config();
    if (cfg?.disableClose) return;
    this.close('escape');
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
  }
}
