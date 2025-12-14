import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRouteEnum } from '../../../enums/app-route.enum';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class FooterComponent {
  protected readonly AppRouteEnum = AppRouteEnum;
  public currentYear = new Date().getFullYear();
  public showStaticLinks = input<boolean>(false);
}
