import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { useEffect, useState } from 'react'
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { FinishModal } from '../components'
import useSound from 'use-sound'
import clcikSfx from '../assets/click.mp3'
import confetti from 'canvas-confetti'

export const TimerPage = () => {
  const { id: activityId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { studyTime, breakTime, subjectId, subjectName } = location.state

  const { fetchData, data, error, isLoading } = useFetch(
    `http://localhost:3000/subtasks/${activityId}`,
    'GET',
    { 'Content-Type': 'application/json' },
    { credentials: 'include' }
  )

  const [localSubTasks, setLocalSubTask] = useState([])
  const [currentSubTaskIndex, setCurrentSubTaskIndex] = useState(0)
  const [progressValue, setProgressValue] = useState(100)
  const [timeLeft, setTimeLeft] = useState(studyTime)
  const [isRunning, setIsRunning] = useState(false)
  const [completedSubTasks, setCompletedSubTasks] = useState(0)
  const [updateSubTask, setUpdateSubTask] = useState(null)
  const [volume, setVolume] = useState(0.5)
  const [buttonText, setButtonText] = useState('EMPEZAR')
  const [isBreak, setIsBreak] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [subTaskStartTime, setSubTaskStartTime] = useState(null)
  const [subTaskTimes, setSubTaskTimes] = useState(() => {
    const savedTimes = localStorage.getItem(`subTaskTimes_${activityId}`)
    return savedTimes ? JSON.parse(savedTimes) : []
  })
  const [pausedTime, setPausedTime] = useState(null)
  const [showFinishModal, setShowFinishModal] = useState(false)
  const [loadingFinished, setLoadingFinished] = useState(false)

  const {
    fetchData: updateFetchData,
    data: updatedSubTaskData,
    error: updateError,
    isLoading: updateLoading,
  } = useFetch(
    updateSubTask
      ? `http://localhost:3000/activities/${activityId}/subtasks/${updateSubTask.id}`
      : null,
    'PUT',
    { estado: 'completada' },
    { 'Content-Type': 'application/json' },
    { credentials: 'include' }
  )

  const [play] = useSound(clcikSfx, { interrupt: true, volume: volume })
  const [pause] = useSound(clcikSfx, { interrupt: true, volume: volume })

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (data) {
      setLocalSubTask(data.Subtareas)
      setCompletedSubTasks(
        data.Subtareas.filter((subtask) => subtask.estado === 'completada')
          .length
      )

      const firstIncompleteIndex = data.Subtareas.findIndex(
        (subtask) => subtask.estado !== 'completada'
      )
      setCurrentSubTaskIndex(
        firstIncompleteIndex !== -1 ? firstIncompleteIndex : 0
      )
      setLoadingFinished(true)
    }
  }, [data])

  useEffect(() => {
    if (updateSubTask) {
      updateFetchData()
    }
  }, [updateSubTask])

  useEffect(() => {
    let timer
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
        setProgressValue(
          (prevValue) => prevValue - 100 / (isBreak ? breakTime : studyTime)
        )
      }, 1000)
    } else if (timeLeft === 0) {
      clearInterval(timer)
      setIsRunning(false)
      if (isBreak) {
        setIsBreak(false)
        setTimeLeft(studyTime)
        setProgressValue(100)
        setIsRunning(true) // Start the timer automatically when switching back to study time
      } else {
        setIsBreak(true)
        setTimeLeft(breakTime)
        setProgressValue(100)
        setIsRunning(true)
      }
    }
    return () => clearInterval(timer)
  }, [isRunning, timeLeft, isBreak, studyTime, breakTime])

  useEffect(() => {
    const allSubTasksCompleted =
      localSubTasks.length > 0 &&
      localSubTasks.every(
        (subtask) => subtask.estado === 'completada' || subtask.completionDate
      )

    const existingData = JSON.parse(
      localStorage.getItem(`subject_${subjectId}`)
    ) || { activities: [] }
    const updatedActivities = existingData.activities.filter(
      (activity) => activity.activityId !== activityId
    )

    updatedActivities.push({
      activityId,
      totalTimeTaken: subTaskTimes.reduce(
        (acc, curr) => acc + curr.timeTaken,
        0
      ),
      completionDate: allSubTasksCompleted ? new Date().toISOString() : null,
      subTasks: subTaskTimes,
    })

    localStorage.setItem(
      `subject_${subjectId}`,
      JSON.stringify({
        subjectName,
        activities: updatedActivities,
      })
    )

    console.log('Saved to localStorage:', {
      subjectName,
      activities: updatedActivities,
    })
  }, [subTaskTimes, activityId, subjectId, localSubTasks, subjectName])

  const handleNextSubTask = async () => {
    if (completedSubTasks >= localSubTasks.length) {
      setIsRunning(false)
      return
    }

    const currentSubTask = localSubTasks[currentSubTaskIndex]
    const timeTaken = Date.now() - subTaskStartTime

    setSubTaskTimes((prevTimes) => [
      ...prevTimes,
      {
        subTaskId: currentSubTask.id,
        timeTaken,
        completionDate: new Date().toISOString(),
      },
    ])

    setUpdateSubTask(currentSubTask)

    setCompletedSubTasks((prev) => prev + 1)
    if (completedSubTasks + 1 === localSubTasks.length) {
      setIsRunning(false)
      setShowFinishModal(true)
      triggerConfetti()

      // Delete the main activity after deleting all subtasks
      await deleteActivity(activityId)
    } else {
      setCurrentSubTaskIndex((prevIndex) => prevIndex + 1)
      setSubTaskStartTime(Date.now())
    }
  }

  const deleteActivity = async (activityId) => {
    const url = `http://localhost:3000/subjects/${subjectId}/activities/${activityId}`
    const fetchOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }

    try {
      const response = await fetch(url, fetchOptions)
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          JSON.stringify({
            status: response.status,
            statusText: response.statusText,
            data: errorData,
          })
        )
      }
    } catch (error) {
      console.error('Error deleting activity:', error)
    }
  }

  const handleClick = (event) => {
    if (event.target.id === 'muteButton') {
      return null
    }

    if (timeLeft === 0) {
      return null
    }

    if (isRunning) {
      pause()
      setPausedTime(Date.now())
    } else {
      play()
      if (pausedTime) {
        setSubTaskStartTime(
          (prevStartTime) => prevStartTime + (Date.now() - pausedTime)
        )
        setPausedTime(null)
      }
    }
    setIsRunning(!isRunning)
    setHasStarted(true)
    if (!hasStarted) {
      setSubTaskStartTime(Date.now())
    }

    setButtonText(
      buttonText === 'EMPEZAR' || buttonText === 'CONTINUAR'
        ? 'PAUSAR'
        : 'CONTINUAR'
    )
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  const formatMilliseconds = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const remainingSeconds = totalSeconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  const totalTimeTaken = subTaskTimes.reduce(
    (acc, curr) => acc + curr.timeTaken,
    0
  )

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      zIndex: 3000,
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center min-h-[calc(100vh-94px)] w-full bg-transparent">
        <span className="loading loading-spinner self-center loading-lg"></span>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-94px)] flex justify-center">
      <div className="flex flex-col w-fit gap-3 justify-center ">
        <div
          onClick={handleClick}
          className={`active:scale-95 cursor-pointer transition-all  ease-in-out h-[400px] w-[400px] duration-500${
            loadingFinished ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <CircularProgressbarWithChildren
            value={progressValue}
            text={formatTime(timeLeft) || '0:00'}
            strokeWidth={10}
            className={`transition-opacity  ease-in-out ${
              loadingFinished ? ' ' : 'opacity-0'
            }`}
            styles={{
              path: { strokeLinecap: 'butt', stroke: '#A855F7' },
              trail: { stroke: '#A6ADBB' },
              text: { fontSize: '1.5rem', fill: '#A855F7' },
            }}
          >
            <button
              className="text-4xl h-full mt-28 font-mono leading-3"
              onClick={handleClick}
            >
              {buttonText}
            </button>
          </CircularProgressbarWithChildren>
        </div>

        <div
          className={`text-center text-2xl my-2 transition-opacity duration-500 ease-in-out ${
            hasStarted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {isBreak ? (
            'Descanso'
          ) : (
            <div className="flex flex-col items-center justify-center gap-1 text-lg">
              <div className="flex items-end justify-center ">
                <span className="text-6xl font-bold pl-5 transition-all duration-500 ease-in-out">
                  {completedSubTasks}
                </span>
                <span className="font-semibold text-2xl">
                  /{localSubTasks.length}
                </span>
              </div>
              <span className="font-semibold">CONSIGNA</span>
            </div>
          )}
        </div>
        {!isBreak && (
          <button
            className={`btn btn-primary w-28 self-center transition-opacity duration-500 ease-in-out ${
              hasStarted ? 'opacity-100' : 'opacity-0'
            } ${!isRunning ? 'disabled' : ''}`}
            onClick={handleNextSubTask}
            disabled={!isRunning}
          >
            Completada
          </button>
        )}
        <button
          className={`btn btn-error w-28 self-center transition-opacity duration-500 ease-in-out ${
            hasStarted ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => {
            navigate(`/subjects/${subjectId}`)
          }}
        >
          Finalizar
        </button>
      </div>

      <FinishModal showFinishModal={showFinishModal}>
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-3xl font-bold mb-4">¡Felicidades!</h2>
          <p className="text-xl">Has completado todas las consignas.</p>
          <p className="text-xl  ">
            Tiempo total: {formatMilliseconds(totalTimeTaken)}
          </p>
          <button
            className="btn btn-primary mt-3 w-fit self-center"
            onClick={() => {
              setShowFinishModal(false)
              navigate(`/subjects/${subjectId}`)
            }}
          >
            Volver a tareas
          </button>
        </div>
      </FinishModal>
    </div>
  )
}
