import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LandingPage, LoginPage, SignUpPage } from './pages';
import { Navbar } from './components';

function App() {
  return (
    <AuthProvider>
      <main>
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUpPage />} />
          </Routes>
        </Router>
      </main>
    </AuthProvider>
  );
}

export default App;
