import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';

import { Observable, of, shareReplay } from 'rxjs';

import { environment } from '@environments/environment';

import { GlobalMessage } from '@core/models/global-message.model';

@Injectable({
  providedIn: 'root',
})
export class GlobalMessageService {
  private readonly BASE_URL = environment.BASE_API_URL;
  private http = inject(HttpClient);

  private readonly globalMessage$ = this.http
    .get<GlobalMessage[]>(`${this.BASE_URL}/global-message`)
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

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
