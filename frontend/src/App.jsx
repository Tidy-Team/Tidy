import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './routes'
import {
  LandingPage,
  LoginPage,
  SignUpPage,
  HomePage,
  SubjectPage,
  CalendarPage,
  StatsPage,
} from './pages'
import { Navbar, SideNav } from './components'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  )
}
function Layout() {
  const location = useLocation()
  const showNavbar = ['/', '/login', '/register'].includes(location.pathname)

  return (
    <>
      {showNavbar ? (
        <Navbar />
      ) : (
        <SideNav>
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<SignUpPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/subjects" element={<HomePage />} />
                <Route path="/subjects/:id" element={<SubjectPage />} />
                <Route path="/stats" element={<StatsPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
              </Route>
            </Routes>
          </main>
        </SideNav>
      )}
      {showNavbar && (
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUpPage />} />
          </Routes>
        </main>
      )}
    </>
  )
}
export default App
