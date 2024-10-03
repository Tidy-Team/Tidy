import { useParams } from 'react-router-dom';
import { useSubjects } from '../context/useSubject.js';
import { useEffect, useState } from 'react';
import { Modal } from '../components/Modal.jsx';
import { ActivityForm } from '../components/ActivitiesForm.jsx';

export function SubjectPage() {
  const { subject, getSubject } = useSubjects();
  const { id } = useParams();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getSubject(id);
  }, [id, getSubject]);

  if (!subject) {
    return <div>Loading...</div>;
  }
  const addActivity = newActivity => {
    console.log('New activity response:', newActivity); // Debugging statement
    const activityData = newActivity.data.activity;
    if (activityData.id === undefined) {
      console.error('New activity has undefined id:', activityData);
      return;
    }
    setActivities([...activities, activityData]);
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl"> {subject.name}</h1>
      <p className="text-xl"> Profesores: {subject.name_teacher}</p>
      <p className="text-2xl"> {subject.description}</p>
      <div className="divider"></div>
      <h1 className="text-4xl">Tareas</h1>
      <Modal children={<ActivityForm addActivity={addActivity} />} />
    </div>
  );
}
