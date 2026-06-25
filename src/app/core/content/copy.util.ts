import { COPY } from './en';

import type { Copy } from './copy.types';


export function copy<T extends keyof Copy>(section: T) {
  return COPY[section];
}
