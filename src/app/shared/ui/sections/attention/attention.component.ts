import {
  Component,
  input,
  ChangeDetectionStrategy,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'trollysix-attention',
  imports: [NgTemplateOutlet],
  templateUrl: './attention.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class AttentionComponent {
  titleTemplate = input<TemplateRef<unknown>>();
  descriptionTemplate = input<TemplateRef<unknown>>();
  ctaTemplate = input<TemplateRef<unknown>>();
}
