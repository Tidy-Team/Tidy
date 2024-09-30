import { Footer, Hero, Navbar, FeatureCard } from '../components';
import { MdAssignmentAdd } from 'react-icons/md';
import { FaRegClock } from 'react-icons/fa';
import { FaArrowTrendUp } from 'react-icons/fa6';

export function LandingPage() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Features */}
      <div className="flex w-3/5 mx-auto">
        <FeatureCard
          icon={<MdAssignmentAdd className="fill-purple-600" />}
          title={'Creación de Materias Personalizadas'}
          description={
            'Organiza tu aprendizaje creando materias a medida. Adapta cada asignatura a tus necesidades y visualiza el progreso de tus tareas de forma clara y sencilla.'
          }
        />
        <div className="divider divider-horizontal my-10"></div>
        <FeatureCard
          icon={<FaRegClock className="fill-purple-600" />}
          title={'Tareas Estructuradas con Pomodoro'}
          description={
            'Divide tus tareas en puntos manejables con nuestro sistema Pomodoro. Alterna entre períodos de trabajo y descansos cortos para mantener tu concentración y reducir la ansiedad.'
          }
        />
        <div className="divider divider-horizontal my-10"></div>
        <FeatureCard
          icon={<FaArrowTrendUp className="fill-purple-600" />}
          title={'Mejora Tu Rendimiento Escolar'}
          description={
            'Optimiza tu estudio con recordatorios y seguimiento del progreso. Diseñada especialmente para estudiantes con TDAH, nuestra app te ayuda a maximizar tu eficiencia y lograr tus objetivos académicos.'
          }
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
