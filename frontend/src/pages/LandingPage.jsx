import { Navbar } from '../components/Navbar';
import ejemplo from '../assets/ejemplo.png';

export function LandingPage() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <div className=" lg:w-3/4  mx-auto mt-10 ">
        <div
          className="hero rounded-xl bg-base-200   border-gray-700"
          style={{
            backgroundImage: `url()`,
            boxShadow: '0 2px 5px 2px black, -12px 12px 0px 0 purple',
          }}
        >
          <div className="hero-content p-10 flex  w-full !items-start">
            {/* Col1 */}
            <div className="w-1/2">
              <div>
                <h3 className="text-5xl py-6 font-semibold ">
                  Organiza, Aprende, y Crece: Todo a tu Ritmo
                </h3>
                <p className="pb-6 font-semibold text-lg">
                  Con <span className="text-purple-500">Tidy</span>, los padres
                  de niños con TDAH pueden organizar materiales escolares, crear
                  rutinas personalizadas y mejorar el aprendizaje con
                  herramientas simples y efectivas, diseñadas para adaptarse a
                  sus necesidades.
                </p>
                <button className="btn text-lg bg-purple-800 hover:bg-purple-950 ">
                  Prueba Ahora
                </button>
              </div>
            </div>
            {/* Col 2 */}
            <div className="self-center">
              <img src={ejemplo} alt="ejemplo" className="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
