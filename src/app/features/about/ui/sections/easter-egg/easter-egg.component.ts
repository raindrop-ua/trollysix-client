import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { DialogService } from '../../../../../core/services/dialog.service';
import { RevealOnScrollDirective } from '../../../../../shared/directives/reveal-on-scroll.directive';
import { CheatCodeDirective } from '../../../../../shared/directives/cheat-code.directive';
import { GenericSectionBlockComponent } from '../../../../../shared/components/sections';

@Component({
  selector: 'app-easter-egg',
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
})
export class EasterEggComponent {
  private readonly dialogService = inject(DialogService);

  onCheatEnter() {
    this.dialogService
      .open({
        title: 'Congratulations!',
        message: "You've found the secret image.",
        confirmText: 'Cool!',
        variant: 'success',
        disableClose: false,
        cancelText: '',
      })
      .subscribe();
  }
}
