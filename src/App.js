import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/SignUp';
function App() {
  return (
    <div className="App">
        <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </Router>
        </NoteState>
    </div>
  );
}

export default App;
