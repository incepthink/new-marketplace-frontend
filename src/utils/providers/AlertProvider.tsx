'use client';
import React, { useEffect, useState } from 'react';
import { AlertContext, AlertType } from '../contexts/AlertContext';
import Success from '@/components/UI/Alerts/Success';
import { Error } from '@/components/UI/Alerts/Error';

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alert, setAlert] = useState<boolean>(false);
  const [type, setType] = useState<AlertType>('');
  const [message, setMessage] = useState<string>('');

  function showAlert(type: AlertType, message: string) {
    setAlert(true);
    setType(type);
    setMessage(message);
  }

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 5000);
    }
  }, [alert]);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && type === 'success' && <Success message={message} />}
      {alert && type === 'error' && <Error message={message} />}
    </AlertContext.Provider>
  );
}
