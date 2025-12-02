import {
  Component,
  computed,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast-container',
  imports: [],
  templateUrl: './toast-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastContainerComponent {
  private readonly toastService = inject(ToastService);

  readonly toasts = computed(() => this.toastService.toasts());

  dismiss(id: number): void {
    this.toastService.dismiss(id);
  }

  typeClasses(type: 'success' | 'error' | 'info'): string {
    switch (type) {
      case 'success':
        return 'border-l-4 border-emerald-500';
      case 'error':
        return 'border-l-4 border-rose-500';
      case 'info':
      default:
        return 'border-l-4 border-sky-500';
    }
  }
}
