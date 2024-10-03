import { createContext, useState, useCallback } from 'react';
import {
  getSubjectsRequest,
  createSubjectsRequest,
  updateSubjectsRequest,
  deleteSubjectsRequest,
  getSubjectRequest,
} from '../api/subjects';

const SubjectContext = createContext();

function SubjectProvider({ children }) {
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState(null);

  const [errors, setErrors] = useState([]);

  const getSubjects = async () => {
    const res = await getSubjectsRequest();
    setSubjects(res.data);
  };

  const deleteSubject = async id => {
    try {
      const res = await deleteSubjectsRequest(id);
      if (res.status === 204) setSubjects(subjects.filter(subject => subject.id !== id));
      getSubjects();
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const createSubject = async subject => {
    try {
      const res = await createSubjectsRequest(subject);
      console.log(res.data);
      return res;
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.message);
    }
  };

  const getSubject = useCallback(async id => {
    try {
      const res = await getSubjectRequest(id);
      console.log(res.data);
      setSubject(res.data); // Set the single subject state
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const updateSubject = async (id, subject) => {
    try {
      await updateSubjectsRequest(id, subject);
    } catch (error) {
      console.error(error);
      setErrors(error.response.data.message);
    }
  };

  return (
    <SubjectContext.Provider
      value={{
        subjects,
        subject,
        getSubjects,
        deleteSubject,
        createSubject,
        getSubject,
        updateSubject,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
}

export { SubjectProvider, SubjectContext };
