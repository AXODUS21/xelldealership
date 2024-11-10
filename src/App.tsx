import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar';
import Store from './pages/store';
import Login from './pages/login';
import Home from './pages/home';
function App() {

  return (
    <body>
      <main>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Router>
      </main>
    </body>
  );
}

export default App
