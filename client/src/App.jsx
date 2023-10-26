import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import GroundDetails from './pages/GroundDetails';

function App() {

  return (
    <>
      <Provider store={store}>
        <Toaster />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ground/:id" element={<GroundDetails />} />
          </Routes>
        </Router>
      </Provider>
    </>
  )
}

export default App
