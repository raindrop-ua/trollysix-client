import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { RevealOnScrollDirective } from '../../../../../shared/directives/reveal-on-scroll.directive';
import { CheatCodeDirective } from '../../../../../shared/directives/cheat-code.directive';
import { NgOptimizedImage } from '@angular/common';
import { GenericSectionBlockComponent } from '../../../../../shared/components/sections';
import { DialogService } from '../../../../../core/services/dialog.service';

@Component({
  selector: 'app-overview',
  imports: [
    RevealOnScrollDirective,
    CheatCodeDirective,
    NgOptimizedImage,
    GenericSectionBlockComponent,
  ],
  templateUrl: './overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OverviewComponent {
  private readonly dialogService = inject(DialogService);

  onCheatEnter() {
    this.dialogService
      .open({
        title: 'Congratulations!',
        message: 'You\'ve found the secret image.',
        confirmText: 'Cool!',
        variant: 'success',
        disableClose: false,
        cancelText: '',
      })
      .subscribe();
  }
}
