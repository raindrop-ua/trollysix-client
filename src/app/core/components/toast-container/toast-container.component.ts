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
        return 'border-l-5 border-emerald-600';
      case 'error':
        return 'border-l-5 border-red-600';
      case 'info':
      default:
        return 'border-l-5 border-sky-600';
    }
  }
}
