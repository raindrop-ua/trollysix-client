import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  effect,
  signal,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { Subject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DialogConfig, DialogResult } from '../../models/dialog.models';
import { DialogService } from '../../services/dialog.service';
import { SvgIconComponent } from '../../../shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [NgClass, SvgIconComponent],
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnDestroy {
  @ViewChild('dialog', { static: true })
  private dialogElement!: ElementRef<HTMLDialogElement>;
  private readonly dialogService = inject(DialogService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly config = signal<DialogConfig | null>(null);
  readonly isOpen = signal(false);
  private readonly resultSubject = new Subject<DialogResult>();

  constructor() {
    this.dialogService.registerHost({
      open: (cfg) => this.open(cfg),
      close: (res) => this.close(res),
    });

    effect(() => {
      const open = this.isOpen();
      const dialog = this.dialogElement?.nativeElement;

      if (!dialog) return;

      if (open && !dialog.open) {
        dialog.showModal();
        if (this.isBrowser) {
          document.documentElement.style.overflow = 'hidden';
          document.body.style.overflow = 'hidden';
        }
      } else if (!open && dialog.open) {
        dialog.close();
        if (this.isBrowser) {
          document.documentElement.style.overflow = '';
          document.body.style.overflow = '';
        }
      }
    });
  }

  open(config: DialogConfig): Observable<DialogResult> {
    const defaults: DialogConfig = {
      confirmText: 'OK',
      cancelText: 'Cancel',
      variant: 'info',
      disableClose: false,
      ...config,
    };

    this.config.set(defaults);
    this.isOpen.set(true);

    return this.resultSubject.asObservable().pipe(take(1));
  }

  close(result: DialogResult) {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    this.resultSubject.next(result);
  }

  onConfirmClick() {
    this.close('confirm');
  }

  onCancelClick() {
    this.close('cancel');
  }

  onBackdropClick() {
    const cfg = this.config();
    if (cfg?.disableClose) return;
    this.close('backdrop');
  }

  onCancelEvent(event: Event) {
    event.preventDefault();
    const cfg = this.config();
    if (cfg?.disableClose) return;
    this.close('escape');
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }
}
