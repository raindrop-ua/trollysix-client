import { aboutCopy } from './copy/about.copy';
import { commonCopy } from './copy/common.copy';
import { errorsCopy } from './copy/errors.copy';
import { footerCopy } from './copy/footer.copy';
import { homeCopy } from './copy/home.copy';
import { legalCopy } from './copy/legal.copy';
import { routeNoteCopy } from './copy/route-note.copy';
import { scheduleCopy } from './copy/schedule.copy';
import { servicesCopy } from './copy/services.copy';

export const COPY = {
  common: commonCopy,
  home: homeCopy,
  schedule: scheduleCopy,
  about: aboutCopy,
  routeNote: routeNoteCopy,
  errors: errorsCopy,
  legal: legalCopy,
  footer: footerCopy,
  services: servicesCopy,
} as const;
