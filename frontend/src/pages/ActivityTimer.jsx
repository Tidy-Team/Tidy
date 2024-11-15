import { useNavigate, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { useEffect, useState } from 'react'
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { BiMusic } from 'react-icons/bi'
import useSound from 'use-sound'
import clcikSfx from '../assets/click.mp3'

export const ActivityTimer = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { fetchData, data, error, isLoading } = useFetch(
    `http://localhost:3000/subtasks/${id}`,
    'GET',
    { 'Content-Type': 'application/json' },
    { credentials: 'include' }
  )

  const [localSubTasks, setLocalSubTask] = useState([])
  const [currentSubTaskIndex, setCurrentSubTaskIndex] = useState(0)
  const [progressValue, setProgressValue] = useState(100)
  const [timeLeft, setTimeLeft] = useState(300)
  const [isRunning, setIsRunning] = useState(false)
  const [completedSubTasks, setCompletedSubTasks] = useState(0)
  const [updateSubTask, setUpdateSubTask] = useState(null)
  const [volume, setVolume] = useState(0.5)
  const [buttonText, setButtonText] = useState('EMPEZAR')

  const {
    fetchData: updateFetchData,
    data: updatedSubTask,
    error: updateError,
    isLoading: updateLoading,
  } = useFetch(
    updateSubTask
      ? `http://localhost:3000/activities/${id}/subtasks/${updateSubTask.id}`
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
        setProgressValue((prevValue) => prevValue - 100 / 300)
      }, 1000)
    } else if (timeLeft === 0) {
      clearInterval(timer)
      setIsRunning(false)
    }
    return () => clearInterval(timer)
  }, [isRunning, timeLeft])

  const handleNextSubTask = async () => {
    if (completedSubTasks >= localSubTasks.length) {
      setIsRunning(false)
      return
    }

    const currentSubTask = localSubTasks[currentSubTaskIndex]
    setUpdateSubTask(currentSubTask)

    setCompletedSubTasks((prev) => prev + 1)
    if (completedSubTasks + 1 === localSubTasks.length) {
      setIsRunning(false)
    } else {
      setCurrentSubTaskIndex((prevIndex) => prevIndex + 1)
    }
  }

  const handleStartTimer = () => {
    setIsRunning(true)
  }

  const handlePauseTimer = () => {
    setIsRunning(false)
  }

  const handleResetTimer = () => {
    setIsRunning(false)
    setTimeLeft(300)
    setProgressValue(100)
    setCompletedSubTasks(0)
    setCurrentSubTaskIndex(0)
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
    } else {
      play()
    }
    setIsRunning(!isRunning)

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

  return (
    <div className="min-h-[calc(100vh-94px)] flex justify-center">
      <div className="flex flex-col w-fit gap-3 align-middle ">
        <div
          onClick={handleClick}
          className="active:scale-95 cursor-pointer transition-all"
        >
          <CircularProgressbarWithChildren
            value={progressValue}
            text={formatTime(timeLeft)}
            strokeWidth={8}
            styles={{
              path: { strokeLinecap: 'butt' },
              text: { fontSize: '2rem' },
            }}
          >
            <button className="text-2xl h-full mt-24" onClick={handleClick}>
              {buttonText}
            </button>
          </CircularProgressbarWithChildren>
        </div>
        <div className="text-center text-2xl my-2">
          Consigna {completedSubTasks}/{localSubTasks.length}
        </div>
        <button
          className="btn btn-primary w-fit self-center"
          onClick={handleNextSubTask}
        >
          Completada
        </button>
        <button className="btn btn-error w-fit self-center">Finalizar</button>
      </div>
    </div>
  )
}
