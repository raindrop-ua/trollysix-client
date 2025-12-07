export interface RouteStop {
  title: string;
  description: string;
  direction: 'forward' | 'backward';
  scheduled: boolean;
  scheduledInApp: boolean;
  onDemand?: boolean;
}
