import { useContext } from 'react'
import { ActivityContext } from './ActivityContext'

export const useActivities = () => {
  const context = useContext(ActivityContext)
  if (!context) {
    throw new Error('useActivities must be used within a ActivityProvider')
  }
  return context
}
