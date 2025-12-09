import { Component, inject } from '@angular/core';
import { SnowService } from '../../../services/snow.service';

@Component({
  selector: 'app-snow',
  imports: [],
  templateUrl: './snow.component.html',
  styles: [
    `
      .snow-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000;
      }

      .snowflake {
        position: absolute;
        background-color: white;
        border-radius: 50%;
        pointer-events: none;
        filter: blur(1px);
      }
    `,
  ],
})
export class SnowComponent {
  public snowService: SnowService = inject(SnowService);
}
