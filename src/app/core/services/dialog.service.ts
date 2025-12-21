import {
  createComponent,
  ApplicationRef,
  EnvironmentInjector,
  inject,
  Injectable,
  ComponentRef,
} from '@angular/core';
import { DialogConfig, DialogResult } from '../models/dialog.models';
import { DialogComponent } from '../components/dialog/dialog.component';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private activeDialogs: ComponentRef<DialogComponent>[] = [];

  open(config: DialogConfig): Subject<DialogResult> {
    const result$ = new Subject<DialogResult>();

    const componentRef = createComponent(DialogComponent, {
      environmentInjector: this.injector,
    });

    componentRef.instance.config.set(config);
    componentRef.instance.result$.subscribe((res) => {
      result$.next(res);
      this.destroyDialog(componentRef);
    });

    this.appRef.attachView(componentRef.hostView);
    document.body.appendChild(componentRef.location.nativeElement);

    this.activeDialogs.push(componentRef);

    return result$;
  }

  private destroyDialog(ref: ComponentRef<DialogComponent>) {
    this.appRef.detachView(ref.hostView);
    ref.destroy();
    this.activeDialogs = this.activeDialogs.filter((d) => d !== ref);
  }
}
