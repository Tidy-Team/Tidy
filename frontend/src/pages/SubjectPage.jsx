import { useParams } from 'react-router-dom';
import { useSubjects } from '../context/useSubject.js';
import { useEffect } from 'react';

export function SubjectPage() {
  const { subject, getSubject } = useSubjects();
  const { id } = useParams();

  useEffect(() => {
    getSubject(id);
  }, [id, getSubject]);

  if (!subject) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl"> {subject.name}</h1>
      <p className="text-xl"> Profesores: {subject.name_teacher}</p>
      <p className="text-2xl"> {subject.description}</p>
      <div className="divider"></div>
      <h1 className="text-4xl">Tareas</h1>
      {/* Activities */}
    </div>
  );
}
