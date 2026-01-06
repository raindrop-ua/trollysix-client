import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GlobalMessageComponent } from '../../ui/global-message/global-message.component';

@Component({
  selector: 'trollysix-public-layout',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    GlobalMessageComponent,
  ],
  templateUrl: './public-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'baseline-background min-w-sm min-h-screen flex flex-col',
  },
})
export class PublicLayoutComponent {}
