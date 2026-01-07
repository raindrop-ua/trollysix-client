export interface OperatingDay {
  title: string;
  vehiclesQuantity: number;
  intervals: string[];
  operationHours: string[];
}

export interface OperatingDays {
  weekday: OperatingDay;
  weekend: OperatingDay;
}
