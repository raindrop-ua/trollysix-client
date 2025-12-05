import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogConfig, DialogResult } from '../models/dialog.models';

interface DialogHost {
  open(config: DialogConfig): Observable<DialogResult>;
  close(result: DialogResult): void;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private host?: DialogHost;

  registerHost(host: DialogHost) {
    this.host = host;
  }

  open(config: DialogConfig): Observable<DialogResult> {
    if (!this.host) {
      throw new Error('Dialog host is not registered.');
    }
    return this.host.open(config);
  }

  close(result: DialogResult) {
    this.host?.close(result);
  }
}
