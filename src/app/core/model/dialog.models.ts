export type DialogVariant = 'info' | 'danger';

export interface DialogConfig {
  title: string;
  message: string;

  confirmText?: string;
  cancelText?: string;

  variant?: DialogVariant;
  disableClose?: boolean;
}

export type DialogResult = 'confirm' | 'cancel' | 'backdrop' | 'escape';
