import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

import { catchError } from 'rxjs/operators';

import { map, Observable, of, shareReplay, timeout } from 'rxjs';

import { environment } from '@environments/environment';

import { GlobalMessage } from '@core/models/global-message.model';
import { ApiResponse } from '@core/models/api-response.model';

@Service()
export class GlobalMessageService {
  private readonly BASE_URL = environment.BASE_API_URL;
  private readonly REQUEST_TIMEOUT_MS = 8_000;
  private http = inject(HttpClient);

  private readonly globalMessage$ = this.http
    .get<ApiResponse<GlobalMessage[]>>(`${this.BASE_URL}/global-message`)
    .pipe(
      map((response) => response.data),
      timeout(this.REQUEST_TIMEOUT_MS),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

  public getGlobalMessage(): Observable<GlobalMessage[]> {
    return this.globalMessage$;
  }

  public getGlobalMessageSafe(): Observable<GlobalMessage[]> {
    return this.getGlobalMessage().pipe(
      catchError(() => {
        return of<GlobalMessage[]>([]);
      }),
    );
  }
}
