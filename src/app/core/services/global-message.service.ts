import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GlobalMessage } from '../models/global-message.model';

@Injectable({
  providedIn: 'root',
})
export class GlobalMessageService {
  private readonly BASE_URL = environment.BASE_API_URL;
  private http = inject(HttpClient);

  private readonly globalMessage$ = this.http
    .get<GlobalMessage>(`${this.BASE_URL}/global-message`)
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  getGlobalMessage(): Observable<GlobalMessage> {
    return this.globalMessage$;
  }
}
