import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const TimerSettings = ({ onStart }) => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [studyTime, setStudyTime] = useState(1500)
  const [breakTime, setBreakTime] = useState(300)

  const handleStart = () => {
    onStart(studyTime, breakTime)
  }

  return (
    <div className="form-control flex flex-col gap-4  ">
      <h1 className="text-center text-2xl"> Ajustes de Temporizador </h1>
      <div className="set-study flex flex-col items-center">
        <h1 className="mb-2">Tiempo de estudio</h1>
        <div className="flex gap-3 w-fit">
          <input
            type="radio"
            name="study-time"
            className="btn btn-md"
            aria-label="35min"
            defaultChecked
            onClick={() => setStudyTime(2100)}
          ></input>
          <input
            type="radio"
            name="study-time"
            className="btn btn-md"
            aria-label="30min"
            onClick={() => setStudyTime(1800)}
          ></input>
          <input
            type="radio"
            name="study-time"
            className="btn btn-md"
            aria-label="25min"
            defaultChecked
            onClick={() => setStudyTime(1500)}
          ></input>
        </div>
      </div>
      <div className="set-break-time flex flex-col items-center">
        <h1 className="mb-2">Tiempo de descanso</h1>
        <div className="flex gap-3 w-fit">
          <input
            type="radio"
            name="break-time"
            className="btn btn-md"
            aria-label="10min"
            onClick={() => setBreakTime(600)}
          ></input>
          <input
            type="radio"
            name="break-time"
            className="btn btn-md"
            aria-label="5min"
            defaultChecked
            onClick={() => setBreakTime(300)}
          ></input>
        </div>
      </div>
      <button
        className="btn btn-secondary btn-wide self-center"
        id="startButton"
        onClick={handleStart}
      >
        Empezar
      </button>
    </div>
  )
}
