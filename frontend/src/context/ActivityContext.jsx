import { createContext, useState, useCallback } from 'react'
import {
  getActivitiesRequest,
  createActivitiesRequest,
  deleteActivitiesRequest,
  updateActivitiesRequest,
} from '../api/activities'

const ActivityContext = createContext()

function ActivityProvider({ children }) {
  const [activities, setActivities] = useState([])
  const [activity, setActivity] = useState(null)
  const [errors, setErrors] = useState([])

  const getActivities = async () => {
    const res = await getActivitiesRequest()
    setActivities(res.data)
  }

  const createActivity = async (activity) => {
    try {
      const res = await createActivitiesRequest(activity)
      console.log(res.data)
      return res
    } catch (error) {
      console.log(error)
      setErrors(error.response.data.message)
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
