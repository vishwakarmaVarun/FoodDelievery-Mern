import React from 'react';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import { CartProvider } from './components/ContextReducer';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {

  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/createuser' element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
