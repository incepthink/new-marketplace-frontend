'use client';
import React from 'react';

export type AlertType = 'success' | 'error' | '';

interface AlertContextType {
  showAlert: (type: AlertType, message: string) => void;
}

export const AlertContext = React.createContext<AlertContextType | undefined>(
  undefined
);

export function useAlert() {
  const context = React.useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}
