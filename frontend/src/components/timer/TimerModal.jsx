import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from '../common/Modal'
import { TimerSettings } from './TimerSettings'

export function TimerModal({
  id = 'timer-modal',
  activityId,
  subjectId,
  subjectName,
}) {
  const navigate = useNavigate()
  const [studyTime, setStudyTime] = useState(300)
  const [breakTime, setBreakTime] = useState(60)

  const handleStart = (selectedStudyTime, selectedBreakTime) => {
    setStudyTime(selectedStudyTime)
    setBreakTime(selectedBreakTime)
    navigate(`/activity/${activityId}`, {
      state: {
        studyTime: selectedStudyTime,
        breakTime: selectedBreakTime,
        subjectId: subjectId,
        subjectName: subjectName,
      },
    })
  }

  return (
    <Modal id={id}>
      <TimerSettings onStart={handleStart} />
    </Modal>
  )
}
