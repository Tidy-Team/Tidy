import React, { createContext, useState } from 'react'
import {
  getActivitiesRequest,
  createActivitiesRequest,
  deleteActivitiesRequest,
  updateActivitiesRequest,
} from '../api/activities'

const ActivityContext = createContext()

function ActivityProvider({ children }) {
  const [activities, setActivities] = useState([])
  const [errors, setErrors] = useState(null)

  const getActivities = async (id) => {
    try {
      const res = await getActivitiesRequest(id)
      setActivities(res.data)
    } catch (error) {
      console.log(error)
      setErrors(error.response.data)
    }
  }

  const createActivity = async (activity) => {
    try {
      const res = await createActivitiesRequest(activity)
      setActivities((prevActivities) => [...prevActivities, res.data])
    } catch (error) {
      console.log(error)
      setErrors(error.response.data)
    }
  }

  return (
    <ActivityContext.Provider
      value={{
        activities,
        errors,
        getActivities,
        createActivity,
      }}
    >
      {children}
    </ActivityContext.Provider>
  )
}

export { ActivityProvider, ActivityContext }
