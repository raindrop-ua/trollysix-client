export type DialogVariant = 'info' | 'danger' | 'warning' | 'success';
export type DialogOpenMode = 'modeless' | 'modal';

export interface DialogConfig {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: DialogVariant;
  disableClose?: boolean;
  customIcon?: string;
}

export type DialogResult = 'confirm' | 'cancel' | 'backdrop' | 'escape';
