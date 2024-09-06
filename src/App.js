// import logo from './logo.svg';
import './App.css';
import Landingpage from './components/LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizArea from './components/QuizArea';
import './index.css'; 

// import QuizArea from './components/QuizArea';

function App() {
  return (
    <>
       <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/quiz" element={<QuizArea />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
