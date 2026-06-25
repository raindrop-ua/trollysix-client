import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  signal,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';

import { Subject } from 'rxjs';

import {
  DialogConfig,
  DialogOpenMode,
  DialogResult,
} from '@core/models/dialog.models';

import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'trollysix-dialog',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  @ViewChild('dialogElement', { static: true })
  private readonly dialogElement!: ElementRef<HTMLDialogElement>;

  readonly config = signal<DialogConfig | null>(null);
  readonly openMode = signal<DialogOpenMode>('modeless');
  readonly isVisible = signal(false);
  readonly titleId = `dialog-title-${crypto.randomUUID()}`;
  readonly descriptionId = `dialog-description-${crypto.randomUUID()}`;

  readonly result$ = new Subject<DialogResult>();

  private showFrameId: number | null = null;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  ngAfterViewInit() {
    const dialog = this.dialogElement.nativeElement;

    if (this.openMode() === 'modal') {
      dialog.showModal();
    } else {
      dialog.show();
    }

    this.showFrameId = requestAnimationFrame(() => {
      this.showFrameId = null;
      this.isVisible.set(true);
    });
  }

  close(result: DialogResult) {
    const dialog = this.dialogElement.nativeElement;

    if (!dialog.open) {
      return;
    }

    this.isVisible.set(false);
    this.closeTimer = setTimeout(() => {
      this.closeTimer = null;
      dialog.close(result);
      this.result$.next(result);
      this.result$.complete();
    }, 300);
  }

  ngOnDestroy(): void {
    if (this.showFrameId !== null) {
      cancelAnimationFrame(this.showFrameId);
      this.showFrameId = null;
    }

    if (this.closeTimer !== null) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }

    if (!this.result$.closed) {
      this.result$.complete();
    }
  }

  onDialogPointerDown(event: PointerEvent) {
    if (
      event.target === this.dialogElement.nativeElement &&
      !this.config()?.disableClose
    ) {
      this.close('backdrop');
    }
  }

  onEscapeKeydown(event: Event) {
    event.preventDefault();

    if (this.config()?.disableClose) {
      return;
    }

    this.close('escape');
  }

  onConfirmClick() {
    this.close('confirm');
  }

  onCancelClick() {
    this.close('cancel');
  }

  onCancelEvent(event: Event) {
    event.preventDefault();
  }
}
