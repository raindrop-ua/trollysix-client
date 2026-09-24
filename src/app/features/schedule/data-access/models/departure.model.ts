export enum Status {
  Past = 'past',
  Now = 'now',
  Soon = 'soon',
  Coming = 'coming',
  Canceled = 'canceled',
}

export interface Departure {
  status: Status;
  departureAt: Date;
  time: string;
  /** Original timetable time in Europe/Kyiv, stable across viewer time zones. */
  scheduleTime: string;
  runNumber: number | null;
  isCanceled?: boolean;
}
