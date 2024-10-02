import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LandingPage, LoginPage, SignUpPage, HomePage } from './pages';
import { Navbar } from './components';

function App() {
  return (
    <AuthProvider>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </Router>
      </main>
    </AuthProvider>
  );
}

export default App;
