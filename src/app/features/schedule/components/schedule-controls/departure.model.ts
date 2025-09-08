export enum Status {
  Past = 'past',
  Now = 'now',
  Soon = 'soon',
  Coming = 'coming',
}

export interface Departure {
  status: Status;
  time: string;
}
