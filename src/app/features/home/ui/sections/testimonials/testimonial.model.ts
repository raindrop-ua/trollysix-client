export interface Testimonial {
  name: string;
  place: string;
  text: string;
}

export interface Testimonials {
  title: string;
  description: string;
  testimonials: Testimonial[];
}
