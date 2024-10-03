import { useContext } from 'react';
import { ActivityContext } from './ActivityContext';

export const useActivities = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
};
