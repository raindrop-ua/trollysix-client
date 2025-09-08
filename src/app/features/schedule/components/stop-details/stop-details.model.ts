export interface StopDetails {
  name: string;
  description: string;
  imageUrl: string;
  sharedRoutes: string[];
  geo: {
    lat: number;
    lon: number;
  };
  weather: {
    temperature: number;
    description: string;
    icon: string;
  };
}
