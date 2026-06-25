import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

import { copy } from '@core/content';
import { AppRouteEnum } from '@core/enums/app-route.enum';

@Component({
  selector: 'trollysix-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class FooterComponent {
  readonly copyFooter = copy('footer');
  protected readonly AppRouteEnum = AppRouteEnum;
  public currentYear = new Date().getFullYear();
  public showStaticLinks = input<boolean>(true);
}
