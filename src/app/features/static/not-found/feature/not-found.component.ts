import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

import { copy } from '@core/content/copy.util';
import { AppRouteEnum } from '@core/enums/app-route.enum';

import { BtnDirective } from '@shared/directives/btn.directive';
import { GenericHeaderComponent } from '@shared/ui/sections/generic-header/generic-header.component';
import { GenericSectionBlockComponent } from '@shared/ui/sections/generic-section-block/generic-section-block.component';

@Component({
  selector: 'trollysix-not-found',
  imports: [
    GenericHeaderComponent,
    GenericSectionBlockComponent,
    RouterLink,
    BtnDirective,
  ],
  templateUrl: './not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class NotFoundComponent {
  readonly copyErrors = copy('errors');
  protected readonly AppRouteEnum = AppRouteEnum;
}
