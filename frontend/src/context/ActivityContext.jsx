import { createContext, useState, useCallback } from 'react';
import {
  getActivitiesRequest,
  getActivityRequest,
  createActivitiesRequest,
  deleteActivitiesRequest,
  updateActivitiesRequest,
} from '../api/activities';

const ActivityContext = createContext();

function ActivityProvider({ children }) {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState(null);
  const [errors, setErrors] = useState([]);

  const getActivities = async () => {
    const res = await getActivitiesRequest();
    setActivities(res.data);
  };

  const deleteActivity = async id => {
    try {
      const res = await deleteActivitiesRequest(id);
      if (res.status === 204) setActivities(activities.filter(activity => activity.id !== id));
      getActivities();
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const createActivity = async activity => {
    try {
      const res = await createActivitiesRequest(activity);
      console.log(res.data);
      return res;
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.message);
    }
  };

  const getActivity = useCallback(async id => {
    try {
      const res = await getActivityRequest(id);
      console.log(res.data);
      setActivity(res.data); // Set the single activity state
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }, []); // Empty dependency array ensures the function is memoized

  const updateActivity = async (id, activity) => {
    try {
      await updateActivitiesRequest(id, activity);
    } catch (error) {
      console.error(error);
      setErrors(error.response.data.message);
    }
  };

  return (
    <ActivityContext.Provider
      value={{
        activities,
        activity,
        getActivities,
        deleteActivity,
        createActivity,
        getActivity,
        updateActivity,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export { ActivityProvider, ActivityContext };
