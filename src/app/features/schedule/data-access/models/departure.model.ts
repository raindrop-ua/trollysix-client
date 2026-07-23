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
  runNumber: number | null;
  isCanceled?: boolean;
}
