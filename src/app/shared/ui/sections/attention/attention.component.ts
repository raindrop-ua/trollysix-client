import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  input,
  ChangeDetectionStrategy,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'trollysix-attention',
  imports: [NgTemplateOutlet],
  templateUrl: './attention.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class AttentionComponent {
  public titleTemplate = input<TemplateRef<unknown>>();
  public descriptionTemplate = input<TemplateRef<unknown>>();
  public ctaTemplate = input<TemplateRef<unknown>>();
}
