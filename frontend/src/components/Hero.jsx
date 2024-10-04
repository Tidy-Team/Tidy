import { Link } from 'react-router-dom'
import heroBg from '../assets/heroBG.jpg'

export const Hero = () => {
  return (
    <div
      className="hero bg-base-200 lg:w-3/5 lg:mx-auto lg:rounded-lg lg:mt-5 relative"
      style={{
        backgroundImage: `url(${heroBg})`,
        opacity: 10,
      }}
    >
      <div className="absolute inset-0  w-full h-full bg-black/40 lg:rounded-lg"></div>
      <div className="hero-content p-10 justify-center text-center md:text-start md:justify-start min-w-full">
        <div className="max-w-md text-white">
          <h1 className="text-4xl md:text-5xl font-bold">
            Estructura tu aprendizaje, mejora tu rendimiento
          </h1>
          <p className="py-6 font-semibold text-lg">
            Transforma tu estudio con nuestra app diseñada para estudiantes con
            TDAH. Organiza materias y tareas de forma intuitiva y mejora tu
            rendimiento académico. ¡Empieza hoy!
          </p>
          <Link to="/register">
            <button className="btn btn-primary">Prueba Tidy Ya</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
