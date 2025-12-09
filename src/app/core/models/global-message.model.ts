export interface GlobalMessage {
  id: string;
  message?: string;
  type?: 'news' | 'issue' | 'warning' | 'info';
}
