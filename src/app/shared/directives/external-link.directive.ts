import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'a[trollysixExternalLink]',
})
export class ExternalLinkDirective {
  @HostBinding('attr.target') public target = '_blank';
  @HostBinding('attr.rel') public rel = 'noopener noreferrer';
  @HostBinding('attr.aria-label') public ariaLabel = 'Opens in a new tab';
  @HostBinding('attr.title') public title = 'Opens in a new tab';
  @HostBinding('class.link-external') public externalLink = true;
}
