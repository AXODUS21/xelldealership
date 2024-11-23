import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar';
import Store from './pages/store';
import Login from './pages/login';
import Home from './pages/home';
import Favorites from './pages/favorites';
import { FavoritesProvider } from './config/globals';
function App() {

  return (
    <body>
      <main>
          <Router>
              <FavoritesProvider>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/favorites" element={<Favorites />} />
                  </Routes>
              </FavoritesProvider>
            </Router>
      </main>
    </body>
  );
}

export default App

