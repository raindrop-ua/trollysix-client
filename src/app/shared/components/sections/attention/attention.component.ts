import { ChangeDetectionStrategy, Component, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-attention',
  imports: [NgTemplateOutlet],
  templateUrl: './attention.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttentionComponent {
  titleTemplate = input<TemplateRef<unknown>>();
  descriptionTemplate = input<TemplateRef<unknown>>();
  ctaTemplate = input<TemplateRef<unknown>>();
}
