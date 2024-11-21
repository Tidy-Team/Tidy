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
  VerificationPage,
  HomePage,
  SubjectPage,
  CalendarPage,
  StatsPage,
  TimerPage,
  ProfilePage,
  FAQPage,
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
  const showSideNav = !showNavbar && location.pathname !== '/verify'

  return (
    <>
      {showNavbar && <Navbar />}
      {showSideNav ? (
        <SideNav>
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<SignUpPage />} />
              <Route path="/verify" element={<VerificationPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/subjects" element={<HomePage />} />
                <Route path="/subjects/:id" element={<SubjectPage />} />
                <Route path="/stats" element={<StatsPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/activity/:id" element={<TimerPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="*" element={<h1>404</h1>} />
              </Route>
            </Routes>
          </main>
        </SideNav>
      ) : (
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/verify" element={<VerificationPage />} />
          </Routes>
        </main>
      )}
    </>
  )
}
export default App
