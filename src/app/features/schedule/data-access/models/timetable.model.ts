export interface Timetable {
  id: string;
  name: string;
  stopId: string;
  dayType: string; // 'weekday' | 'weekend' | 'holiday'
  direction: string; // 'forward' | 'backward'
  times: string[];
}
