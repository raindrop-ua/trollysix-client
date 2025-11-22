export type DirectionName = 'forward' | 'backward';

export interface Direction {
  id: string;
  name: DirectionName;
  label: string; // 'Forward', 'Backward'
}
