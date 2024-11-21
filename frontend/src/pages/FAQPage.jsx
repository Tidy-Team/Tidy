import { FaQuestionCircle } from 'react-icons/fa'
import { FaAngleDown } from 'react-icons/fa'

export const FAQPage = () => {
  return (
    <div className="md:px-36 mb-10">
      <h1 className="flex  text-4xl font-semibold justify-center gap-3 mb-10">
        Preguntas Frecuentes
        <FaQuestionCircle className="fill-purple-600" />
      </h1>
      <div className="flex flex-col gap-2">
        <div className="collapse bg-base-200 py-2">
          <input type="radio" name="my-accordion-1" defaultChecked />
          <div className="collapse-title text-xl  font-medium flex gap-3 align-middle pl-10">
            ¿Qué es Tidy?
            <FaAngleDown className="text-3xl" />
          </div>
          <div className="collapse-content">
            <p className="p-2 text-lg">
              Tidy es una aplicación diseñada para ayudar a estudiantes con TDAH
              a organizar sus tareas y mejorar su productividad mediante
              herramientas como la división de actividades, temporizador
              pomodoro y notificaciones.
            </p>
          </div>
        </div>

        <div className="collapse bg-base-200 py-2">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl  font-medium flex gap-3 align-middle pl-10">
            ¿Cómo ayuda Tidy a los estudiantes con TDAH?
            <FaAngleDown className="text-3xl" />
          </div>
          <div className="collapse-content">
            <p className="p-2 text-lg">
              Permite organizar tareas en pasos pequeños y manejables,
              priorizarlas y trabajar en sesiones enfocadas usando un
              temporizador pomodoro, lo que reduce el estrés y mejora el
              rendimiento.
            </p>
          </div>
        </div>

        <div className="collapse bg-base-200 py-2">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl  font-medium flex gap-3 align-middle pl-10">
            ¿Puedo usar Tidy si no tengo TDAH?
            <FaAngleDown className="text-3xl" />
          </div>
          <div className="collapse-content">
            <p className="p-2 text-lg">
              Sí, aunque Tidy está diseñado especialmente para estudiantes con
              TDAH, cualquier persona que quiera mejorar su organización y
              gestión del tiempo puede beneficiarse.
            </p>
          </div>
        </div>

        <div className="collapse bg-base-200 py-2">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl  font-medium flex gap-3 align-middle pl-10">
            ¿Qué tipo de reportes genera Tidy?
            <FaAngleDown className="text-3xl" />
          </div>
          <div className="collapse-content">
            <p className="p-2 text-lg">
              Tidy proporciona reportes semanales sobre el progreso, mostrando
              el promedio de tiempo que toma cada actividad, así como la
              cantidad de tareas hechas por semana. También generamos puntos de
              eficiencia a partir de todo lo anterior, para saber en qué materia
              se está siendo más eficiente.
            </p>
          </div>
        </div>

        <div className="collapse bg-base-200 py-2">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl  font-medium flex gap-3 align-middle pl-10">
            ¿Cómo asegura Tidy la privacidad de mis datos?
            <FaAngleDown className="text-3xl" />
          </div>
          <div className="collapse-content">
            <p className="p-2 text-lg">
              Todas las comunicaciones están protegidas por HTTPS, y los datos
              se cifran tanto en tránsito como en almacenamiento.
            </p>
          </div>
        </div>

        <div className="collapse bg-base-200 py-2">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl  font-medium flex gap-3 align-middle pl-10">
            ¿Qué pasa si cierro el temporizador pomodoro antes de terminar?
            <FaAngleDown className="text-3xl" />
          </div>
          <div className="collapse-content">
            <p className="p-2 text-lg">
              ¿Qué pasa si cierro el temporizador pomodoro antes de terminar?
            </p>
          </div>
        </div>

        <div className="collapse bg-base-200 py-2">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl  font-medium flex gap-3 align-middle pl-10">
            ¿Qué hago si tengo problemas técnicos con Tidy?
            <FaAngleDown className="text-3xl" />
          </div>
          <div className="collapse-content">
            <p className="p-2 text-lg">
              Puedes contactar al soporte técnico a través de{' '}
              <a className="text-secondary font-semibold" href="">
                soporte@tidy.com
              </a>{' '}
              o visitar nuestra sección de ayuda en el sitio web.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
