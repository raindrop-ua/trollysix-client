import {
  Component,
  computed,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { RevealOnScrollDirective } from '../../../shared/directives/reveal-on-scroll.directive';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-toast-container',
  imports: [RevealOnScrollDirective, NgClass],
  templateUrl: './toast-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ToastContainerComponent {
  private readonly toastService = inject(ToastService);
  readonly toasts = computed(() => this.toastService.toasts());

  dismiss(id: number): void {
    this.toastService.dismiss(id);
  }
}
