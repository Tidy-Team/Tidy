import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'

export const CalendarPage = () => {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('http://localhost:3000/activities', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setActivities(Array.isArray(data) ? data : [])
      } catch (error) {
        console.log('Error fetching activities:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  const events =
    activities.length > 0
      ? activities.map((activity) => ({
          title: activity.titulo,
          date: activity.fecha_fin,
        }))
      : []
  const handleEventMouseEnter = (info) => {
    const date = info.event.start.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    tippy(info.el, {
      content: `${info.event.title} - ${date}`,
      placement: 'top',
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center min-h-[calc(100vh-94px)] w-full">
        <span className="loading loading-spinner self-center loading-lg"></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-94px)] w-full">
        <p className="text-red-500">
          Error loading activities: {error.message}
        </p>
      </div>
    )
  }

  return (
    <div
      className={`transition-opacity duration-300 ${
        loading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="calc(100vh - 94px)"
        locale={esLocale}
        eventMouseEnter={handleEventMouseEnter}
      />
    </div>
  )
}
