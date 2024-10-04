import { FaFacebook, FaFacebookF, FaIcons, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

export const Footer = () => {
  return (
    <footer className="footer text-base-content justify-center md:justify-normal p-10 mt-10   lg:w-3/5 lg:mx-auto ">
      <aside>
        <h1 className="text-5xl font-bold text-purple-600 mb-2">Tidy</h1>
        <p>Copyright © 2024 - Todos los derechos reservados</p>
      </aside>
      <nav className="md:justify-self-center">
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a href="#">{<FaXTwitter className="text-3xl" />}</a>
          <a href="#">{<FaYoutube className="text-3xl" />}</a>
          <a href="#">{<FaFacebookF className="text-3xl" />}</a>
        </div>
      </nav>
    </footer>
  )
}
