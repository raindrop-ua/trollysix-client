import { EventManagerPlugin } from '@angular/platform-browser';

export class PreventDefaultEventPlugin extends EventManagerPlugin {
  public override supports(eventName: string): boolean {
    return eventName.endsWith('.prevent');
  }
  public override addEventListener(
    element: HTMLElement,
    eventName: string,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    handler: Function,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  ): Function {
    const originalEvent = eventName.split('.')[0];
    return this.manager.addEventListener(element, originalEvent, (e: Event) => {
      e.preventDefault();
      handler(e);
    });
  }
}
