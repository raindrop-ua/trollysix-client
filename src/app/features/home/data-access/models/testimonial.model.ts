export interface Testimonial {
  name: string;
  place: string;
  text: string;
  avatarUrl: string;
}

export interface Testimonials {
  title: string;
  description: string;
  testimonials: Testimonial[];
}
