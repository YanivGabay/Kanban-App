import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Settings } from './pages/Settings'
import { Profile } from './pages/Profile'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

import './App.css'

function App() {
  

  return (
    <Router>
      <Routes>
        {/*home page - represent the dashboard */}
        <Route path="/" element={<Home />} />
        <Route path="/Settings" element= {<Settings />} />
        {/*profile page */}
        <Route path="/Profile" element= {<Profile />} />
        {/*login page */}
        <Route path="/Login" element= {<Login />} />
        {/*register page */}
        <Route path="/Register" element= {<Register />} />
       
      </Routes>

    </Router>
  
  );
}

export default App
