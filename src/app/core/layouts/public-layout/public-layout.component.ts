import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GlobalMessageComponent } from '../../components/global-message/global-message.component';

@Component({
  selector: 'app-public-layout',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    GlobalMessageComponent,
  ],
  templateUrl: './public-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PublicLayoutComponent {}
