import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';

function App() {

  return (
    <Provider store={store}>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/" element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
