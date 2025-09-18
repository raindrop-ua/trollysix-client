export interface Timetable {
  id: string;
  name: string;
  stop_id: string;
  dayType: string; // 'weekday' | 'weekend' | 'holiday'
  direction: string; // 'forward' | 'backward'
  times: string[];
}
