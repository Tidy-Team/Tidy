import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SubjectProvider } from './context/SubjectContext';
import { ProtectedRoute } from './routes';
import { LandingPage, LoginPage, SignUpPage, HomePage } from './pages';
import { Navbar, SideNav } from './components';
import { SubjectPage } from './pages/SubjectPage';
import { ActivityProvider } from './context/ActivityContext';

function App() {
  return (
    <AuthProvider>
      <SubjectProvider>
        <ActivityProvider>
          <Router>
            <Layout />
          </Router>
        </ActivityProvider>
      </SubjectProvider>
    </AuthProvider>
  );
}
function Layout() {
  const location = useLocation();
  const showNavbar = ['/', '/login', '/register'].includes(location.pathname);

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
                <Route path="/add-subject" />
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
  );
}
export default App;
