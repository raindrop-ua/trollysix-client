import { COPY } from './en';

export function copy<T extends keyof typeof COPY>(section: T) {
  return COPY[section];
}
