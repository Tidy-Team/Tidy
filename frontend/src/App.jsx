import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LandingPage, LoginPage, SignUpPage } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
