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

  public readonly config = signal<DialogConfig | null>(null);
  public readonly openMode = signal<DialogOpenMode>('modeless');
  public readonly isVisible = signal(false);
  public readonly titleId = `dialog-title-${crypto.randomUUID()}`;
  public readonly descriptionId = `dialog-description-${crypto.randomUUID()}`;

  public readonly result$ = new Subject<DialogResult>();

  private showFrameId: number | null = null;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  public ngAfterViewInit(): void {
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

  public close(result: DialogResult): void {
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

  public ngOnDestroy(): void {
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

  public onDialogPointerDown(event: PointerEvent): void {
    if (
      event.target === this.dialogElement.nativeElement &&
      !this.config()?.disableClose
    ) {
      this.close('backdrop');
    }
  }

  public onEscapeKeydown(event: Event): void {
    event.preventDefault();

    if (this.config()?.disableClose) {
      return;
    }

    this.close('escape');
  }

  public onConfirmClick(): void {
    this.close('confirm');
  }

  public onCancelClick(): void {
    this.close('cancel');
  }

  public onCancelEvent(event: Event): void {
    event.preventDefault();
  }
}
