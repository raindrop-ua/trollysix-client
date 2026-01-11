import { NgOptimizedImage } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { ToastService } from '@core/services/toast.service';

import { CheatCodeDirective } from '@shared/directives/cheat-code.directive';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';
import { GenericSectionBlockComponent } from '@shared/ui/sections/generic-section-block/generic-section-block.component';

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
