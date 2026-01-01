import {
  Component,
  computed,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { SvgIconComponent } from '../../../shared/ui';

@Component({
  selector: 'app-toast-container',
  imports: [NgClass, SvgIconComponent],
  templateUrl: './toast-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class ToastContainerComponent {
  private readonly toastService = inject(ToastService);
  readonly toasts = computed(() => this.toastService.toasts());

  dismiss(id: number): void {
    this.toastService.dismiss(id);
  }
}
