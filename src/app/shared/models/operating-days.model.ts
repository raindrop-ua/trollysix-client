export interface OperatingDay {
  title: string;
  vehiclesQuantity: number;
  intervals: string[];
}

export interface OperatingDays {
  weekday: OperatingDay;
  weekend: OperatingDay;
}
