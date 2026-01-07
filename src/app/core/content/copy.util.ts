import { Copy } from '@core/content/copy.types';

import { COPY } from './en';

export function copy<T extends keyof Copy>(section: T) {
  return COPY[section];
}
