export interface TimeEntity {
  time: string;
  scheduleNumber: number | null;
}

export interface Timetable {
  id: string;
  name: string;
  stopId: string;
  validFrom: string;
  dayType: string; // 'weekday' | 'weekend' | 'holiday'
  direction: string; // 'forward' | 'backward'
  times: TimeEntity[];
}
