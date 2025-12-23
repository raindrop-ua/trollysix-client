import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';

type IconButtonVariant = 'default' | 'strong' | 'warning';
type IconButtonSize = 'md' | 'sm';

@Directive({
  selector: 'button[appIconButton], a[appIconButton]',
  host: {
    '[class]': 'classes()',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.title]': 'title() || null',
  },
})
export class IconButtonDirective {
  private hostElement = inject(ElementRef<HTMLElement>);

  variant = input<IconButtonVariant>('default');
  size = input<IconButtonSize>('md');
  ariaLabel = input<string>('');
  title = input<string>('');
  extraClass = input<string>('');

  private base = [
    'baseline-borders',
    'inline-flex',
    'cursor-pointer',
    'items-center',
    'justify-center',
    'rounded-xl',
    'shadow-sm',
    'transition',
    'focus-visible:outline-2',
    'focus-visible:outline-offset-2',
    'focus-visible:outline-gray-900',
    'dark:focus-visible:outline-white',
  ];

  private sizes: Record<IconButtonSize, string[]> = {
    md: ['h-10', 'w-10', 'px-2', 'py-1', 'text-sm', 'font-medium'],
    sm: ['h-9', 'w-9', 'px-2', 'py-1', 'text-sm', 'font-medium'],
  };

  private variants: Record<IconButtonVariant, string[]> = {
    default: [
      'bg-white/50',
      'text-gray-700',
      'hover:bg-white',
      'dark:bg-gray-900/50',
      'dark:text-gray-100',
      'dark:hover:bg-gray-900/80',
    ],
    strong: [
      'bg-white/50',
      'text-gray-700',
      'hover:bg-white',
      'dark:bg-gray-900/80',
      'dark:text-gray-100',
      'dark:hover:bg-gray-900/80',
    ],
    warning: [
      'bg-white/50',
      'text-yellow-500',
      'hover:bg-white',
      'dark:bg-gray-900/50',
      'dark:text-yellow-500',
      'dark:hover:bg-gray-900/80',
    ],
  };

  classes = computed(() => {
    return [
      ...this.base,
      ...this.sizes[this.size()],
      ...this.variants[this.variant()],
      this.extraClass(),
    ]
      .filter(Boolean)
      .join(' ');
  });

  constructor() {
    effect(() => {
      const el = this.hostElement.nativeElement;
      if (el.tagName.toLowerCase() === 'button') {
        const btn = el as HTMLButtonElement;
        if (!btn.getAttribute('type')) btn.type = 'button';
      }
    });
  }
}
