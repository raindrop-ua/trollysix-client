import { HttpContextToken } from '@angular/common/http';

/** Suppresses global UI side effects for unobtrusive background requests. */
export const SILENT_HTTP_REQUEST = new HttpContextToken<boolean>(() => false);
