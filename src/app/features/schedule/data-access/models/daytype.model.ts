export type DayTypeName = 'weekday' | 'weekend';

export interface DayType {
  id: string;
  name: DayTypeName;
  label: string; // 'Weekday', 'Weekend'
}
