import React from 'react'

import { FaClock } from 'react-icons/fa'

import {
  ResponsiveChartContainer,
  BarPlot,
  SparkLineChart,
  PiePlot,
  ChartsXAxis,
  useItemTooltip,
  useMouseTracker,
  BarChart,
  PieChart,
} from '@mui/x-charts'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import {
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Label,
} from 'recharts'
import { Tooltip } from '@mui/material'

const fakeSubjects = [
  {
    subjectId: '1',
    data: {
      subjectName: 'Matemáticas',
      activities: [
        {
          activityId: '101',
          totalTimeTaken: 600000, // 10 minutes in milliseconds
          completionDate: null,
          subTasks: [
            {
              subTaskId: '1001',
              timeTaken: 300000, // 5 minutes in milliseconds
              completionDate: '2023-11-06T11:55:00Z',
            },
            {
              subTaskId: '1002',
              timeTaken: 300000, // 5 minutes in milliseconds
              completionDate: '2023-11-01T10:00:00Z',
            },
          ],
        },
        {
          activityId: '102',
          totalTimeTaken: 600000, // 10 minutes in milliseconds
          completionDate: null,
          subTasks: [
            {
              subTaskId: '1003',
              timeTaken: 300000, // 5 minutes in milliseconds
              completionDate: '2023-11-02T11:55:00Z',
            },
            {
              subTaskId: '1004',
              timeTaken: 300000, // 5 minutes in milliseconds
              completionDate: '2023-11-02T12:00:00Z',
            },
          ],
        },
      ],
    },
  },

  {
    subjectId: '3',
    data: {
      subjectName: 'Biología',
      activities: [
        {
          activityId: '301',
          totalTimeTaken: 600000, // 10 minutes in milliseconds
          completionDate: '2023-11-04T16:00:00Z',
          subTasks: [
            {
              subTaskId: '3001',
              timeTaken: 300000, // 5 minutes in milliseconds
              completionDate: '2023-11-04T15:55:00Z',
            },
            {
              subTaskId: '3002',
              timeTaken: 300000, // 5 minutes in milliseconds
              completionDate: '2023-11-04T16:00:00Z',
            },
          ],
        },
      ],
    },
  },
  {
    subjectId: '4',
    data: {
      subjectName: 'Geografía',
      activities: [
        {
          activityId: '401',
          totalTimeTaken: 600000, // 10 minutes in milliseconds
          completionDate: '2023-11-05T10:00:00Z',
          subTasks: [
            {
              subTaskId: '4001',
              timeTaken: 300000, // 5 minutes in milliseconds
              completionDate: '2023-11-03T14:00:00Z',
            },
            {
              subTaskId: '4002',
              timeTaken: 300000, // 5 minutes in milliseconds
              completionDate: '2023-11-05T10:00:00Z',
            },
          ],
        },
        {
          activityId: '402',
          totalTimeTaken: 600000, // 10 minutes in milliseconds
          completionDate: '2023-11-06T12:00:00Z',
          subTasks: [
            {
              subTaskId: '4003',
              timeTaken: 300000, // 5 minutes in milliseconds
              completionDate: '2023-11-06T11:55:00Z',
            },
            {
              subTaskId: '4004',
              timeTaken: 300000, // 5 minutes in milliseconds
              completionDate: '2023-11-06T12:00:00Z',
            },
          ],
        },
      ],
    },
  },
  {
    subjectId: '5',
    data: {
      subjectName: 'Inglés',
      activities: [
        {
          activityId: '501',
          totalTimeTaken: 600000, // 10 minutes in milliseconds
          completionDate: '2023-11-07T15:00:00Z',
          subTasks: [
            {
              subTaskId: '5001',
              timeTaken: 300000, // 5 minutes in milliseconds
              completionDate: '2023-11-06T11:55:00Z',
            },
            {
              subTaskId: '5002',
              timeTaken: 300000, // 5 minutes in milliseconds
              completionDate: '2023-11-07T15:00:00Z',
            },
          ],
        },
        {
          activityId: '502',
          totalTimeTaken: 600000, // 10 minutes in milliseconds
          completionDate: '2023-11-08T17:00:00Z',
          subTasks: [
            {
              subTaskId: '5003',
              timeTaken: 300000, // 5 minutes in milliseconds
              completionDate: '2023-11-08T16:55:00Z',
            },
            {
              subTaskId: '5004',
              timeTaken: 300000, // 5 minutes in milliseconds
              completionDate: '2023-11-08T17:00:00Z',
            },
          ],
        },
      ],
    },
  },
]
// Helper function to format time in MM:SS
const formatTime = (seconds) => {
  const roundedSeconds = Math.floor(seconds)
  const minutes = Math.floor(roundedSeconds / 60)
  const remainingSeconds = roundedSeconds % 60
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}

// Retrieve theme from local storage
const savedTheme = localStorage.getItem('theme') || 'dark'

// Create themes
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

// Determine which theme to use
const theme = savedTheme === 'cupcake' ? lightTheme : darkTheme

// Helper function to calculate average time
const calculateAverageTime = (times) => {
  if (times.length === 0) return 0
  const total = times.reduce((acc, time) => acc + time, 0)
  return total / times.length
}

// Helper function to calculate efficiency points
const calculateEfficiencyPoints = (subject) => {
  const totalTime = subject.data.activities.reduce(
    (acc, activity) => acc + activity.totalTimeTaken,
    0
  )
  const completedTasks = subject.data.activities.reduce(
    (acc, activity) =>
      acc +
      activity.subTasks.filter((subTask) => subTask.completedDate !== null)
        .length,
    0
  )
  const averageTime = calculateAverageTime(
    subject.data.activities.flatMap((activity) =>
      activity.subTasks.map((subTask) => subTask.timeTaken)
    )
  )

  // Combine metrics into a single efficiency points score
  const efficiencyPoints =
    totalTime / 1000 + completedTasks * 10 + averageTime / 1000

  return efficiencyPoints
}

const TimeSpentPerSubject = ({ data }) => {
  const categories = data.map((item) => item.subjectName)
  const totalTimes = data.map((item) => item.totalTime)

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-2 text-center">
          Tiempo por materia
        </h2>

        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: categories,
              scaleType: 'band',
            },
          ]}
          series={[
            {
              id: 'totalTime',
              data: totalTimes,
              label: 'Tiempo Total',
              valueFormatter: (value) => formatTime(value),
            },
          ]}
          tooltip={{
            formatter: (value) => formatTime(value),
          }}
        />
      </div>
    </ThemeProvider>
  )
}

const MostEfficientDays = ({ data }) => {
  const daysOfWeek = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ]
  const counts = Array(7).fill(0)

  data.forEach((subject) => {
    subject.data.activities.forEach((activity) => {
      activity.subTasks.forEach((subTask) => {
        const day = new Date(subTask.completionDate).getDay()
        counts[day] += 1
      })
    })
  })

  const lineData = daysOfWeek.map((day, index) => ({
    day,
    tasksCompleted: counts[index],
  }))

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-2 text-center">
          Tareas Completadas por Día
        </h2>
        <div className="flex-grow">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={lineData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="day"></XAxis>

              <RechartsTooltip />
              <Legend />
              <Line
                type="monotone"
                name="Tareas Completadas"
                dataKey="tasksCompleted"
                stroke="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ThemeProvider>
  )
}

const CompletedVsStartedActivities = ({ data }) => {
  const completedActivities = data.filter(
    (activity) => activity.completionDate !== null
  ).length
  const startedActivities = data.length - completedActivities

  const pieData = [
    { id: 0, value: completedActivities, label: 'Completadas' },
    { id: 1, value: startedActivities, label: 'Iniciadas' },
  ]

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-2 text-center">
          Actividades Iniciadas vs Completadas
        </h2>
        <PieChart
          data={pieData}
          margin={{ top: 0, bottom: 50, left: 100, right: 100 }}
          series={[
            {
              data: pieData,
              label: 'Activities',
              innerRadius: 25,
              paddingAngle: 3,
              cornerRadius: 8,
              outerRadius: 70,
              cx: '50%',
            },
          ]}
          slotProps={{
            legend: {
              position: { vertical: 'bottom', horizontal: 'middle' },
              itemMarkHeight: 4,
              labelStyle: {
                fontSize: 15,
              },
              padding: -3,
            },
          }}
        />
      </div>
    </ThemeProvider>
  )
}
const SubjectEfficiencyRadarChart = ({ data }) => {
  const radarData = data.map((subject) => ({
    subjectName: subject.data.subjectName,
    efficiencyPoints: calculateEfficiencyPoints(subject),
  }))

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-2 text-center">
          Puntos de Eficiencia por Materia
        </h2>
        <div className="flex-grow">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              data={radarData}
              margin={{ top: 5, right: 50, left: 50, bottom: 5 }}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="subjectName" />

              <Radar
                name="Efficiency Points"
                dataKey="efficiencyPoints"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Tooltip formatter={(value) => value.toFixed(2)} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ThemeProvider>
  )
}

export const StatsPage = () => {
  // Retrieve all subjects from local storage
  const keys = Object.keys(localStorage).filter((key) =>
    key.startsWith('subject_')
  )

  const realSubjects = keys.map((key) => ({
    subjectId: key.split('_')[1],
    data: JSON.parse(localStorage.getItem(key)),
  }))

  const subjects = [...fakeSubjects, ...realSubjects]

  // Aggregate total time for each subject
  const timeSpentPerSubjectData = subjects.map((subject) => {
    const totalTime = subject.data.activities.reduce(
      (acc, activity) => acc + activity.totalTimeTaken,
      0
    )
    return {
      subjectName: subject.data.subjectName,
      totalTime: totalTime / 1000, // Convert milliseconds to seconds
    }
  })

  const timePerSubtaskData = subjects.flatMap((subject) =>
    subject.data.activities.flatMap((activity) =>
      activity.subTasks.map((subTask) => ({
        subTaskName: subject.data.subjectName,
        time: subTask.timeTaken / 1000, // Convert milliseconds to seconds
      }))
    )
  )

  // Calculate average time of completion for subtasks and activities
  const subTaskTimes = timePerSubtaskData.map((subTask) => subTask.time)
  const activityTimes = subjects.flatMap((subject) =>
    subject.data.activities.map(
      (activity) =>
        activity.subTasks.reduce((acc, subTask) => acc + subTask.timeTaken, 0) /
        1000 // Convert milliseconds to seconds
    )
  )

  const averageSubTaskTime = calculateAverageTime(subTaskTimes)
  const averageActivityTime = calculateAverageTime(activityTimes)

  return (
    <div className="container  min-h-[calc(100vh-94px)]">
      <div className="grid grid-cols-4 grid-rows-2 gap-6  ">
        <div className="col-span-2 h-72 space-y-5 ">
          {/* Timepo actividad */}
          <div className="stats stats-vertical shadow bg-base-200  w-full  h-full ">
            <div className="stat">
              <div className="stat-figure text-primary">
                <FaClock className="text-5xl" />
              </div>
              <div className="stat-title text-xl">
                Tiempo Promedio de Tareas
              </div>
              <div className="stat-value text-5xl w-fit">
                {formatTime(averageActivityTime)}
              </div>
              <div className="stat-desc text-base text-secondary">
                21% más rapido que el último mes
              </div>
            </div>
            <div className="stat">
              <div className="stat-figure text-primary">
                <FaClock className="text-5xl" />
              </div>
              <div className="stat-title text-xl">
                Tiempo Promedio de Consignas
              </div>
              <div className="stat-value text-5xl">
                {formatTime(averageSubTaskTime)}
              </div>
              <div className="stat-desc text-base text-secondary">
                56% más rapido que el último mes
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 col-start-1 row-start-2 bg-base-200 rounded-xl p-4 shadow h-72">
          <MostEfficientDays data={subjects} />
        </div>

        <div className="col-span-2 col-start-3 row-start-1 bg-base-200 p-4  rounded-xl shadow h-72">
          <TimeSpentPerSubject data={timeSpentPerSubjectData} />
        </div>
        <div className="col-start-3 row-start-2 bg-base-200 p-4  rounded-xl shadow h-72">
          {/* <CompletedVsStartedActivities
            data={subjects.flatMap((subject) => subject.data.activities)}
          /> */}
        </div>
        <div className="col-start-3 col-span-2 row-start-2 bg-base-200 p-4 rounded-xl shadow h-72">
          <SubjectEfficiencyRadarChart data={subjects} />
        </div>
      </div>
    </div>
  )
}

export default StatsPage
