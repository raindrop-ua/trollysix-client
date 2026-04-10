export interface RouteStop {
  id: string;
  title: string;
  direction: 'forward' | 'backward';
  scheduled: boolean;
  scheduledInApp: boolean;
  onDemand?: boolean;
}
