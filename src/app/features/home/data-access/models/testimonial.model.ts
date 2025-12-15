export interface Testimonial {
  id: string;
  name: string;
  place: string;
  text: string;
  avatarUrl: string;
  rating: number;
}

export interface Testimonials {
  overallRating: number;
  testimonials: Testimonial[];
}
