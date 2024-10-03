import { useContext } from 'react';
import { SubjectContext } from './SubjectContext';

export const useSubjects = () => {
  const context = useContext(SubjectContext);
  if (!context) {
    throw new Error('useSubjects must be used within a SubjectProvider');
  }
  return context;
};
