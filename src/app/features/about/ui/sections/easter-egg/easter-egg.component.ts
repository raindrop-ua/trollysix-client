import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ToastService } from '../../../../../core/services/toast.service';
import { RevealOnScrollDirective } from '../../../../../shared/directives/reveal-on-scroll.directive';
import { CheatCodeDirective } from '../../../../../shared/directives/cheat-code.directive';
import { GenericSectionBlockComponent } from '../../../../../shared/ui/sections';

@Component({
  selector: 'trollysix-easter-egg',
  imports: [
    NgOptimizedImage,
    RevealOnScrollDirective,
    CheatCodeDirective,
    NgOptimizedImage,
    GenericSectionBlockComponent,
  ],
  templateUrl: './easter-egg.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class EasterEggComponent {
  private readonly toastService: ToastService = inject(ToastService);

  onCheatEnter() {
    this.toastService.success("You've found the secret image.", {
      title: 'Congratulations!',
    });
  }
}
